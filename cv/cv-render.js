/* =============================================================================
 * cv-render.js — one render function per section *type*.
 *
 * These functions consume window.CV_DATA (cv-data.js) and build the DOM.
 * They are generic over their data, so adding entries never requires touching
 * this file; only adding a brand-new *kind* of section would.
 * ========================================================================== */

(function () {
  "use strict";

  /* --- small helpers ----------------------------------------------------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  /* The author's own name is bold everywhere it appears in an author list
   * (\textbf{Kim Youwang} in the LaTeX source). */
  function boldSelf(escapedHtml) {
    return escapedHtml.replace(/Kim Youwang/g, "<b>Kim Youwang</b>");
  }

  /* Wrap the first occurrence of `needle` in `escapedHtml` with `open`/`close`. */
  function wrap(escapedHtml, needle, open, close) {
    if (!needle) return escapedHtml;
    var target = esc(needle);
    var i = escapedHtml.indexOf(target);
    if (i < 0) return escapedHtml;
    return (
      escapedHtml.slice(0, i) + open + target + close + escapedHtml.slice(i + target.length)
    );
  }

  function section(title, modifier) {
    var sec = el("section", "cv-section" + (modifier ? " " + modifier : ""));
    sec.appendChild(el("h2", "cv-section-title", esc(title)));
    return sec;
  }

  function subsection(parent, title) {
    parent.appendChild(el("h3", "cv-subsection-title", esc(title)));
  }

  /* --- Header ------------------------------------------------------------
   * Renders the flushleft header block of main.tex + the 1.5pt rule.
   * --------------------------------------------------------------------- */
  function renderHeader(data) {
    var frag = document.createDocumentFragment();

    var row1 = el("div", "cv-header-row");
    row1.appendChild(el("h1", "cv-name", esc(data.name)));
    frag.appendChild(row1);

    if (data.position) {
      frag.appendChild(el("div", "cv-position", esc(data.position)));
    }

    if (data.links && data.links.length) {
      var contact = data.links
        .map(function (l) {
          return (
            '<a class="cv-underline" href="' + esc(l.url) + '">' + esc(l.label) + "</a>"
          );
        })
        .join('<span class="cv-sep">|</span>');
      frag.appendChild(el("div", "cv-contact", contact));
    }

    frag.appendChild(el("hr", "cv-rule"));
    return frag;
  }

  /* --- Bio (short summary, tinted block) ---------------------------------
   * **double asterisks** in the data mark the phrases to emphasize.
   * --------------------------------------------------------------------- */
  function renderBio(sentences) {
    var text = (Array.isArray(sentences) ? sentences : [sentences])
      .map(esc)
      .join(" ")
      .replace(/\*\*([^*]+)\*\*/g, '<b class="cv-bio-key">$1</b>');
    return el("div", "cv-bio", text);
  }

  function mediaBase() {
    var data = window.CV_DATA;
    return (data && data.mediaBase) || "cv/media/";
  }

  function logoImg(logo) {
    return (
      '<img class="cv-logo" src="' + esc(mediaBase()) + esc(logo) +
      '.png" alt="' + esc(logo) + '">'
    );
  }

  /* First line of an entry.
   *   { org, team, role }  →  [logo] Org (Team) – Role   (Experience)
   *   { title }            →  Title                      (Education)
   * The logo is glued to the first word of whatever follows it so it can never
   * end up alone on a line of its own. */
  function entryTitle(e) {
    if (!e.org) return esc(e.title);

    var text = esc(e.org);
    if (e.team) text += " (" + esc(e.team) + ")";
    if (e.role) text += " &ndash; " + esc(e.role);

    if (!e.logo) return text;

    var cut = text.indexOf(" ");
    var first = cut < 0 ? text : text.slice(0, cut);
    var rest = cut < 0 ? "" : text.slice(cut);
    return (
      '<span class="cv-nowrap">' + logoImg(e.logo) + first + "</span>" + rest
    );
  }

  /* Link every known person named in a detail line (Managers: …, Advisor: …).
   * Longest names first, so one name can never eat a prefix of another. */
  function linkPeople(escapedHtml) {
    var people = (window.CV_DATA && window.CV_DATA.peopleLinks) || {};
    Object.keys(people)
      .sort(function (a, b) { return b.length - a.length; })
      .forEach(function (name) {
        escapedHtml = wrap(
          escapedHtml,
          name,
          '<a class="cv-link" href="' + esc(people[name]) + '" target="_blank" rel="noopener">',
          "</a>"
        );
      });
    return escapedHtml;
  }

  /* --- \cventry blocks (Education, Experience) ---------------------------- */
  function renderCventrySection(title, entries, modifier) {
    var sec = section(title, modifier);

    entries.forEach(function (e) {
      var entry = el("div", "cv-entry");

      var row1 = el("div", "cv-entry-row");
      row1.appendChild(el("div", "cv-entry-left cv-entry-title", entryTitle(e)));
      row1.appendChild(el("div", "cv-entry-right", esc(e.location)));
      entry.appendChild(row1);

      var row2 = el("div", "cv-entry-row");
      row2.appendChild(el("div", "cv-entry-left", linkPeople(esc(e.detail))));
      row2.appendChild(el("div", "cv-entry-right", esc(e.date)));
      entry.appendChild(row2);

      sec.appendChild(entry);
    });

    return sec;
  }

  /* --- Research Interests (free-form two-line block) ---------------------- */
  function renderResearchInterests(title, data, modifier) {
    var sec = section(title, modifier);
    sec.appendChild(
      el(
        "div",
        "cv-freeform cv-justify",
        "<b>Goal &ndash;</b> " + esc(data.goal) + "<br>" +
        "<b>Keywords &ndash;</b> " + esc(data.keywords)
      )
    );
    return sec;
  }

  /* --- Awards and Honors -------------------------------------------------- */
  function renderAwardList(title, entries) {
    var sec = section(title);
    var ul = el("ul", "cv-list");

    entries.forEach(function (a) {
      var li = el("li");
      var head = el("div", "cv-award-head");
      head.appendChild(el("span", "cv-award-title", esc(a.title)));
      head.appendChild(el("span", "cv-award-year", esc(a.year)));
      li.appendChild(head);
      if (a.note) li.appendChild(el("div", "cv-award-note cv-justify", esc(a.note)));
      ul.appendChild(li);
    });

    sec.appendChild(ul);
    return sec;
  }

  /* --- Publications -------------------------------------------------------
   * Replicates `etaremune`: items stay in the given (most-recent-first) order
   * but are labelled in reverse, so the *last* item is 01 and the first is N,
   * zero-padded to two digits and prefixed J (journal) / C (conference).
   * --------------------------------------------------------------------- */
  function renderPubList(items, prefix) {
    var n = items.length;
    return items.map(function (item, i) {
      var label = prefix + String(n - i).padStart(2, "0") + ".";
      return Object.assign({}, item, { label: label });
    });
  }

  function renderAbbrevTable(rows) {
    var wrap = el("div", "cv-abbrev-wrap");
    var table = el("table", "cv-abbrev");
    table.appendChild(el("caption", null, "Abbreviations"));

    var tbody = document.createElement("tbody");
    rows.forEach(function (r) {
      var tr = document.createElement("tr");
      tr.appendChild(el("td", "cv-abbrev-key", esc(r[0])));
      tr.appendChild(el("td", "cv-abbrev-val", esc(r[1])));
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  }

  function renderPubItems(items, prefix) {
    var ul = el("ul", "cv-publist");

    renderPubList(items, prefix).forEach(function (p) {
      var li = el("li");
      li.appendChild(el("span", "cv-pub-label", esc(p.label)));

      /* The quoted paper title gets a little breathing room inside its quotes,
       * and becomes a link when the entry has a `url`. */
      var authors = boldSelf(esc(p.authors)).replace(/“([^”]+)”/, function (_, t) {
        var inner = p.url
          ? '<a class="cv-link" href="' + esc(p.url) +
            '" target="_blank" rel="noopener">' + t + "</a>"
          : t;
        return '“<span class="cv-pub-title">' + inner + "</span>”";
      });

      var html = authors + "<br>";
      html += '<span class="cv-venue">' + esc(p.venue) + "</span>";
      if (p.note) {
        html += ' <span class="cv-pub-note">(' + esc(p.note) + ")</span>";
      }

      li.appendChild(el("div", "cv-pub-body cv-justify", html));
      ul.appendChild(li);
    });

    return ul;
  }

  function renderPublications(title, data) {
    var sec = section(title, "cv-section--pub");

    sec.appendChild(renderAbbrevTable(data.abbreviations));

    subsection(sec, "Journal Articles");
    sec.appendChild(renderPubItems(data.journal, "J"));

    subsection(sec, "Conference Papers");
    sec.appendChild(renderPubItems(data.conference, "C"));

    return sec;
  }

  /* --- Technology Transfer, Patent ---------------------------------------- */
  function renderBulletList(title, entries) {
    var sec = section(title);
    var ul = el("ul", "cv-list cv-justify");

    entries.forEach(function (e) {
      ul.appendChild(el("li", null, "<b>" + esc(e.bold) + "</b> " + esc(e.text)));
    });

    sec.appendChild(ul);
    return sec;
  }

  /* --- Mentoring Experience ----------------------------------------------- */
  function renderMentoring(title, entries) {
    var sec = section(title);
    var ul = el("ul", "cv-list cv-list--tight cv-justify");

    entries.forEach(function (m) {
      var html = esc(m.text);
      if (m.bold) html = "<b>" + html + "</b>";
      else if (m.boldSpan) html = wrap(html, m.boldSpan, "<b>", "</b>");
      ul.appendChild(el("li", null, html));
    });

    sec.appendChild(ul);
    return sec;
  }

  /* --- Professional Activities (one subsection per reviewer list) --------- */
  function renderReviewerList(parent, group) {
    subsection(parent, group.title);
    var ul = el("ul", "cv-list cv-list--tight cv-justify");

    group.items.forEach(function (r) {
      var years = wrap(esc(r.years), r.highlight, '<span class="cv-note">', "</span>");
      ul.appendChild(el("li", null, esc(r.name) + " &ndash; " + years));
    });

    parent.appendChild(ul);
  }

  /* --- Reference ----------------------------------------------------------- */
  function renderReferenceList(title, entries) {
    var sec = section(title);
    var ul = el("ul", "cv-list");

    entries.forEach(function (r) {
      ul.appendChild(
        el(
          "li",
          "cv-ref",
          '<span class="cv-ref-name">' + esc(r.name) + "</span>, " + esc(r.role) + "<br>" +
          "Relationship: " + esc(r.relationship) + "<br>" +
          'email: <a href="mailto:' + esc(r.email) + '">' + esc(r.email) + "</a>"
        )
      );
    });

    sec.appendChild(ul);
    return sec;
  }

  /* --- Document content ---------------------------------------------------
   * This is the section order of the page; rearranging it is just a matter of
   * moving these lines around.
   * --------------------------------------------------------------------- */
  function buildContent(data) {
    var root = document.createDocumentFragment();

    root.appendChild(renderHeader(data.header));
    if (data.bio) root.appendChild(renderBio(data.bio));
    root.appendChild(renderCventrySection("Work Experience", data.experience));
    root.appendChild(renderCventrySection("Education", data.education));
    root.appendChild(renderAwardList("Awards and Honors", data.awards));

    /* Currently disabled — the bio block above covers the same ground.
     * `researchInterests` is still in cv-data.js; uncomment to bring it back. */
    // root.appendChild(
    //   renderResearchInterests("Research Interests", data.researchInterests)
    // );

    root.appendChild(renderPublications("Publications", data.publications));
    root.appendChild(renderBulletList("Technology Transfer", data.techtransfer));
    root.appendChild(renderBulletList("Patent", data.patents));
    root.appendChild(renderMentoring("Mentoring Experience", data.mentoring));

    var pa = section("Professional Activities");
    renderReviewerList(pa, data.professionalActivities.journalReviewer);
    renderReviewerList(pa, data.professionalActivities.conferenceReviewer);
    root.appendChild(pa);

    // root.appendChild(renderReferenceList("Reference", data.references));

    /* Not part of the compiled PDF (talk.tex / media.tex are never \input'd).
     * Uncomment together with the matching data in cv-data.js to enable. */
    // root.appendChild(renderCventrySection("Talks", data.talks));
    // root.appendChild(renderBulletList("Media Coverage", data.media));

    return root;
  }

  /* --- A4 pagination ------------------------------------------------------
   * The content is flowed into as many A4 sheets as it needs, so the page on
   * screen is split exactly where the printed PDF will break. Splitting goes
   * section → section children → list items, and a heading is never left
   * stranded at the bottom of a sheet.
   *
   * Where the breaks land must not depend on the viewport, so every number the
   * paginator looks at is taken from the *specified* A4 geometry rather than
   * from something the browser rounds:
   *
   *   - the limit comes from the computed min-height/padding (fractional px),
   *     not clientHeight — 297mm is 1122.52px, and a whole-pixel rounding
   *     difference is enough to flip an item onto the next sheet;
   *   - the fill height comes from getBoundingClientRect(), not scrollHeight,
   *     for the same reason;
   *   - and the whole pass is deferred until the fonts and logos have settled
   *     (see whenMetricsSettled), so nothing is measured mid-load.
   * --------------------------------------------------------------------- */
  function isHeading(node) {
    return node && /^H[1-6]$/.test(node.tagName);
  }

  function isList(node) {
    return node && (node.tagName === "UL" || node.tagName === "OL");
  }

  function paginate(root, flow) {
    /* Measure at 1:1. fit() may already have scaled the stack down (it is also
     * wired to window `load`, which can beat the pagination pass), and a
     * transform is baked into getBoundingClientRect() — measuring through a
     * 0.4x scale would fit ~2.5 pages of content onto every sheet. The whole
     * pass below is synchronous, so nothing can re-apply it mid-flow; fit()
     * runs again right after. */
    root.style.transform = "";

    /* Justified body text (.cv-justify) picks its line breaks from glyph
     * advances, and those are hinted per font rasterizer — Mobile Safari
     * doesn't measure pixel-identical to a desktop engine even at the same
     * unscaled 210mm width. Over enough dense text that drift can add up to a
     * line, which is enough to tip a borderline entry onto a different sheet
     * than on desktop. CROSS_ENGINE_SLACK trims the usable height so an entry
     * needs more than the expected engine-to-engine drift to flip pages. It
     * doesn't make the boundary immovable, just less likely to fall exactly
     * where two engines disagree. */
    var CROSS_ENGINE_SLACK = 32;

    var body = newSheet(root);
    var limit = sheetLimit(body);

    function overflows() {
      /* .cv-sheet-body is a flow-root of auto height, so its border box is the
       * content height — fractional, unlike scrollHeight. The epsilon only
       * absorbs float noise; the operands themselves are now deterministic. */
      return body.getBoundingClientRect().height > limit + 0.05;
    }

    function newSheet(host) {
      var sheet = el("div", "cv-sheet");
      var inner = el("div", "cv-sheet-body");
      sheet.appendChild(inner);
      host.appendChild(sheet);
      return inner;
    }

    /* The printable box of an A4 sheet, straight from the CSS: min-height is
     * the full page and the paddings are the margins, all resolved to
     * fractional px. Reading clientHeight instead would hand back a rounded
     * page height *and* grow with the content once a sheet overflows. */
    function sheetLimit(inner) {
      var cs = window.getComputedStyle(inner.parentNode);
      return (
        parseFloat(cs.minHeight) -
        parseFloat(cs.paddingTop) -
        parseFloat(cs.paddingBottom) -
        CROSS_ENGINE_SLACK
      );
    }

    /* Start a fresh sheet, carrying any trailing headings over with it. */
    function breakSection(section, shell) {
      var carry = [];
      while (isHeading(shell.lastElementChild)) {
        carry.unshift(shell.lastElementChild);
        shell.removeChild(shell.lastElementChild);
      }
      if (!shell.children.length && shell.parentNode) {
        shell.parentNode.removeChild(shell);
      }

      body = newSheet(root);
      var next = section.cloneNode(false);
      next.className += " cv-section--continued";
      body.appendChild(next);
      carry.forEach(function (node) {
        next.appendChild(node);
      });
      return next;
    }

    function splitList(section, shell, list) {
      var listShell = list.cloneNode(false);
      shell.appendChild(listShell);

      Array.prototype.slice.call(list.children).forEach(function (item) {
        listShell.appendChild(item);
        if (!overflows()) return;

        listShell.removeChild(item);
        if (!listShell.children.length && listShell.parentNode) {
          listShell.parentNode.removeChild(listShell);
        }
        shell = breakSection(section, shell);
        listShell = list.cloneNode(false);
        shell.appendChild(listShell);
        listShell.appendChild(item);
      });

      return shell;
    }

    function splitSection(section) {
      var shell = section.cloneNode(false);
      body.appendChild(shell);

      Array.prototype.slice.call(section.children).forEach(function (child) {
        shell.appendChild(child);
        if (!overflows()) return;

        shell.removeChild(child);
        if (isList(child) && child.children.length > 1) {
          shell = splitList(section, shell, child);
        } else {
          shell = breakSection(section, shell);
          shell.appendChild(child);
        }
      });
    }

    Array.prototype.slice.call(flow.children).forEach(function (block) {
      body.appendChild(block);
      if (!overflows()) return;

      body.removeChild(block);
      if (block.classList.contains("cv-section") && block.children.length > 1) {
        splitSection(block);
      } else {
        if (body.children.length) body = newSheet(root);
        body.appendChild(block);
      }
    });

    /* \pagestyle{plain} */
    Array.prototype.slice.call(root.querySelectorAll(".cv-sheet")).forEach(
      function (sheet, i) {
        sheet.appendChild(el("div", "cv-pagenum", String(i + 1)));
      }
    );
  }

  /* Run `done` once the page measures the same as it will once it is fully
   * loaded — i.e. after the fonts have resolved and every logo has decoded.
   *
   * This is what keeps the breaks identical on a phone and on a desktop. The
   * logos are `height: 1em; width: auto`, so an image that has not arrived yet
   * measures zero wide; paginating at that moment lays the Experience titles
   * out narrower than they end up, and every later break inherits the error.
   * A warm cache hides it — which is exactly why the two devices disagreed. */
  function whenMetricsSettled(node, done) {
    var pending = 1;                    /* the scan itself */
    var fired = false;
    var guard = null;

    function finish() {
      if (fired) return;
      fired = true;
      window.clearTimeout(guard);
      done();
    }

    function settle() {
      if (--pending === 0) finish();
    }

    /* A logo that never answers must not keep the CV off the screen. */
    guard = window.setTimeout(finish, 3000);

    Array.prototype.slice.call(node.querySelectorAll("img")).forEach(function (img) {
      if (img.complete) return;
      pending++;
      img.addEventListener("load", settle, { once: true });
      img.addEventListener("error", settle, { once: true });
    });

    if (document.fonts && document.fonts.ready) {
      pending++;
      document.fonts.ready.then(settle, settle);
    }

    settle();
  }

  /* --- Fit-to-width --------------------------------------------------------
   * The document is always paginated into real A4 sheets, at every viewport
   * size. When the window is narrower than a sheet, the whole stack is scaled
   * down as one block, so a phone gets the printed page in miniature rather
   * than a reflowed approximation of it.
   *
   * A transform does not affect layout, so .cv-fit (which clips the un-scaled
   * 210mm box) is given the scaled height explicitly; without it the document
   * would keep the full-size height and trail a long empty gap.
   * --------------------------------------------------------------------- */
  var fitEl = null;
  var pagesEl = null;

  function fit() {
    if (!fitEl || !pagesEl) return;

    /* Measure unscaled: .cv-fit's clientWidth is its padding box, unaffected
     * by the overflowing child, and offsetHeight ignores the transform. */
    pagesEl.style.transform = "";
    fitEl.style.height = "";

    var avail = fitEl.clientWidth;
    var pageWidth = pagesEl.offsetWidth;
    if (!avail || !pageWidth) return;

    var scale = avail / pageWidth;
    if (scale >= 1) return;                    /* room to spare: leave it at 1:1 */

    pagesEl.style.transform = "scale(" + scale + ")";
    fitEl.style.height = Math.ceil(pagesEl.offsetHeight * scale) + "px";
  }

  /* --- Entry point --------------------------------------------------------- */
  function render() {
    var data = window.CV_DATA;
    var root = document.getElementById("cv-root");
    if (!data || !root) return;

    document.title = "CV - " + data.header.name;
    root.innerHTML = "";

    /* Floating print / save-as-PDF control, kept outside the sheets. */
    var toolbar = el("div", "cv-toolbar");
    var button = el(
      "button",
      "cv-pdf-link",
      '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" ' +
      'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M8 1.6v8.2"/><path d="M4.6 6.4 8 9.8l3.4-3.4"/>' +
      '<path d="M2.2 11.4v1.9c0 .7.6 1.3 1.3 1.3h9c.7 0 1.3-.6 1.3-1.3v-1.9"/>' +
      "</svg>" +
      '<span class="cv-pdf-label">Download PDF</span>'
    );
    button.type = "button";
    button.setAttribute("aria-label", "Download this CV as a PDF");
    button.title = "Save as PDF — choose “Save as PDF” as the destination";
    button.addEventListener("click", function () {
      window.print();
    });
    toolbar.appendChild(button);
    root.appendChild(toolbar);

    var flow = el("div");
    flow.appendChild(buildContent(data));

    /* The toolbar stays outside .cv-pages: a transformed ancestor becomes the
     * containing block for `position: fixed`, which would strand the button. */
    fitEl = el("div", "cv-fit");
    pagesEl = el("div", "cv-pages");
    fitEl.appendChild(pagesEl);
    root.appendChild(fitEl);

    whenMetricsSettled(flow, function () {
      paginate(pagesEl, flow);
      fit();
    });
  }

  /* Page breaks are viewport-independent now, so a resize only needs a new
   * scale factor — never a re-render. */
  var resizeTimer = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(fit, 150);
  });

  /* The print stylesheet drops the transform; restore it afterwards. */
  window.addEventListener("afterprint", fit);

  document.addEventListener("DOMContentLoaded", function () {
    render();
  });

  /* Logos and any late-arriving metrics can change the scaled height. */
  window.addEventListener("load", fit);
})();
