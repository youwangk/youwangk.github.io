/* cv-render.js — one render function per section type, driven by window.CV_DATA. */

(function () {
  "use strict";

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

  /* Bold the author's own name everywhere it appears (\textbf{Kim Youwang} in LaTeX). */
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

  // Header: flushleft block of main.tex + the 1.5pt rule.
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

  // Bio: **double asterisks** in the data mark phrases to emphasize.
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

  /* Entry title: { org, team, role } -> [logo] Org (Team) – Role (Experience);
   * { title } -> Title (Education). The logo is glued to the first word after
   * it so it can't end up alone on its own line. */
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
   * Longest names first, so one name can't eat a prefix of another. */
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

  // \cventry blocks (Education, Experience)
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

  // Research Interests (free-form two-line block)
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

  // Awards and Honors
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

  /* Publications: replicates `etaremune` — items stay in most-recent-first
   * order but are labelled in reverse, so the last item is 01. Zero-padded
   * to two digits and prefixed J (journal) / C (conference). */
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

      // Quoted title becomes a link when the entry has a `url`.
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

  // Technology Transfer, Patent
  function renderBulletList(title, entries) {
    var sec = section(title);
    var ul = el("ul", "cv-list cv-justify");

    entries.forEach(function (e) {
      ul.appendChild(el("li", null, "<b>" + esc(e.bold) + "</b> " + esc(e.text)));
    });

    sec.appendChild(ul);
    return sec;
  }

  // Mentoring Experience
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

  // Professional Activities: one subsection per reviewer list
  function renderReviewerList(parent, group) {
    subsection(parent, group.title);
    var ul = el("ul", "cv-list cv-list--tight cv-justify");

    group.items.forEach(function (r) {
      var years = wrap(esc(r.years), r.highlight, '<span class="cv-note">', "</span>");
      ul.appendChild(el("li", null, esc(r.name) + " &ndash; " + years));
    });

    parent.appendChild(ul);
  }

  // Reference
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

  // Document content — the page's section order; rearrange by moving these lines.
  function buildContent(data) {
    var root = document.createDocumentFragment();

    root.appendChild(renderHeader(data.header));
    if (data.bio) root.appendChild(renderBio(data.bio));
    root.appendChild(renderCventrySection("Work Experience", data.experience));
    root.appendChild(renderCventrySection("Education", data.education));
    root.appendChild(renderAwardList("Awards and Honors", data.awards));

    // Disabled — bio block above covers the same ground. Data stays in cv-data.js.
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

    // Not part of the compiled PDF (talk.tex / media.tex never \input'd).
    // root.appendChild(renderCventrySection("Talks", data.talks));
    // root.appendChild(renderBulletList("Media Coverage", data.media));

    return root;
  }

  /* A4 pagination: content flows into as many A4 sheets as needed, splitting
   * section -> children -> list items so a heading never strands at a page
   * bottom. Breaks must not depend on viewport, so every measurement uses the
   * specified A4 geometry (fractional px from computed style / getBoundingClientRect)
   * instead of rounded values like clientHeight/scrollHeight, and the pass is
   * deferred until fonts and logos have settled (whenMetricsSettled). */
  function isHeading(node) {
    return node && /^H[1-6]$/.test(node.tagName);
  }

  function isList(node) {
    return node && (node.tagName === "UL" || node.tagName === "OL");
  }

  function paginate(root, flow) {
    /* Measure at 1:1 — fit() may have already scaled the stack down, and a
     * transform is baked into getBoundingClientRect(). fit() reruns after. */
    root.style.transform = "";

    /* .cv-justify line breaks depend on glyph advances, which differ slightly
     * per rasterizer (e.g. Mobile Safari vs desktop) even at the same width.
     * This slack absorbs that drift so a borderline entry doesn't flip pages
     * between devices. */
    var CROSS_ENGINE_SLACK = 32;

    var body = newSheet(root);
    var limit = sheetLimit(body);

    function overflows() {
      // .cv-sheet-body is a flow-root, so its border-box height is exact (fractional).
      return body.getBoundingClientRect().height > limit + 0.05;
    }

    function newSheet(host) {
      var sheet = el("div", "cv-sheet");
      var inner = el("div", "cv-sheet-body");
      sheet.appendChild(inner);
      host.appendChild(sheet);
      return inner;
    }

    // Printable box of an A4 sheet, from CSS min-height/padding (fractional, unlike clientHeight).
    function sheetLimit(inner) {
      var cs = window.getComputedStyle(inner.parentNode);
      return (
        parseFloat(cs.minHeight) -
        parseFloat(cs.paddingTop) -
        parseFloat(cs.paddingBottom) -
        CROSS_ENGINE_SLACK
      );
    }

    // Start a fresh sheet, carrying any trailing headings over with it.
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

    // \pagestyle{plain}
    Array.prototype.slice.call(root.querySelectorAll(".cv-sheet")).forEach(
      function (sheet, i) {
        sheet.appendChild(el("div", "cv-pagenum", String(i + 1)));
      }
    );
  }

  /* Draw the abbreviations table's `|` rule as one element spanning the key
   * column's full height (a per-row border/box-shadow renders dashed instead
   * of solid). Must run at 1:1 scale, same as paginate(). */
  function drawAbbrevDividers(root) {
    Array.prototype.slice.call(root.querySelectorAll(".cv-abbrev-wrap")).forEach(
      function (wrap) {
        var keyCells = wrap.querySelectorAll(".cv-abbrev-key");
        if (!keyCells.length) return;

        var wrapRect = wrap.getBoundingClientRect();
        var firstRect = keyCells[0].getBoundingClientRect();
        var lastRect = keyCells[keyCells.length - 1].getBoundingClientRect();

        var rule = el("div", "cv-abbrev-rule");
        rule.style.left = (firstRect.right - wrapRect.left) + "px";
        rule.style.top = (firstRect.top - wrapRect.top) + "px";
        rule.style.height = (lastRect.bottom - firstRect.top) + "px";
        wrap.appendChild(rule);
      }
    );
  }

  /* Run `done` once the page measures the same as after full load (fonts
   * resolved, logos decoded) — keeps pagination identical across devices.
   * Logos are `height: 1em; width: auto`, so an undecoded image measures
   * zero-wide and would throw off every later page break. */
  function whenMetricsSettled(node, done) {
    var pending = 1; // the scan itself
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

    // A logo that never answers must not keep the CV off the screen.
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

  /* Fit-to-width: the document is always paginated into real A4 sheets; when
   * the viewport is narrower than a sheet, the whole stack is scaled down as
   * one block. .cv-fit gets the scaled height explicitly since a transform
   * doesn't affect layout. */
  var fitEl = null;
  var pagesEl = null;

  function fit() {
    if (!fitEl || !pagesEl) return;

    // Measure unscaled: clientWidth ignores overflow, offsetHeight ignores the transform.
    pagesEl.style.transform = "";
    fitEl.style.height = "";

    var avail = fitEl.clientWidth;
    var pageWidth = pagesEl.offsetWidth;
    if (!avail || !pageWidth) return;

    var scale = avail / pageWidth;
    if (scale >= 1) return; // room to spare: leave it at 1:1

    pagesEl.style.transform = "scale(" + scale + ")";
    fitEl.style.height = Math.ceil(pagesEl.offsetHeight * scale) + "px";
  }

  // Entry point
  function render() {
    var data = window.CV_DATA;
    var root = document.getElementById("cv-root");
    if (!data || !root) return;

    document.title = "CV - " + data.header.name;
    root.innerHTML = "";

    // Floating print / save-as-PDF control, kept outside the sheets.
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

    // Toolbar stays outside .cv-pages: a transformed ancestor would strand a `position: fixed` button.
    fitEl = el("div", "cv-fit");
    pagesEl = el("div", "cv-pages");
    fitEl.appendChild(pagesEl);
    root.appendChild(fitEl);

    whenMetricsSettled(flow, function () {
      paginate(pagesEl, flow);
      drawAbbrevDividers(pagesEl);
      fit();
    });
  }

  // Page breaks are viewport-independent; a resize only needs a new scale factor.
  var resizeTimer = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(fit, 150);
  });

  // Print stylesheet drops the transform; restore it afterwards.
  window.addEventListener("afterprint", fit);

  document.addEventListener("DOMContentLoaded", function () {
    render();
  });

  // Logos and late-arriving metrics can change the scaled height.
  window.addEventListener("load", fit);
})();
