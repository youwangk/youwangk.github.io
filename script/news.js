/* Homepage news renderer. Data lives in news-data.js. */
(function () {
    "use strict";

    function escapeHtml(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function formatDate(value) {
        var parts = String(value).split("-");
        var date = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, 1));

        if (Number.isNaN(date.getTime())) return value;
        return new Intl.DateTimeFormat("en", {
            month: "short",
            year: "numeric",
            timeZone: "UTC"
        }).format(date);
    }

    function renderNews() {
        var container = document.getElementById("news-list");
        var database = window.NEWS_DB;

        if (!container) return;
        if (!database || !Array.isArray(database.items)) {
            container.innerHTML = '<p class="noscript-message">News data could not be loaded.</p>';
            return;
        }

        var initialVisible = Math.max(1, Number(database.initialVisible) || 4);
        var expandedVisible = Math.max(initialVisible, Number(database.expandedVisible) || 10);
        var items = database.items.slice().sort(function (a, b) {
            return String(b.date).localeCompare(String(a.date));
        });

        var rows = items.map(function (item, index) {
            var title = escapeHtml(item.title);
            var content = item.url
                ? '<a href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener noreferrer">' + title + '</a>'
                : title;
            var badge = item.isNew ? '<span class="news-badge">New</span>' : "";
            var hidden = index >= initialVisible ? " hidden" : "";
            var extraClass = index >= initialVisible ? " news-extra" : "";

            return [
                '<article class="news-item' + extraClass + '"' + hidden + '>',
                '<time class="news-date" datetime="' + escapeHtml(item.date) + '">' + escapeHtml(formatDate(item.date)) + '</time>',
                '<p class="news-copy">' + content + badge + '</p>',
                '</article>'
            ].join("");
        }).join("");

        var hiddenCount = Math.max(0, items.length - initialVisible);
        var toggle = hiddenCount
            ? '<button class="news-toggle" type="button" aria-expanded="false" aria-controls="news-items">Show more</button>'
            : "";

        container.innerHTML = '<div class="news-items" id="news-items">' + rows + '</div>' + toggle;

        var button = container.querySelector(".news-toggle");
        var itemContainer = container.querySelector(".news-items");
        if (!button) return;

        function updateScrollLimit() {
            var expanded = button.getAttribute("aria-expanded") === "true";
            var allRows = Array.prototype.slice.call(itemContainer.querySelectorAll(".news-item"));
            var needsScroll = expanded && allRows.length > expandedVisible;

            itemContainer.classList.toggle("is-scrollable", needsScroll);
            itemContainer.style.maxHeight = "";
            itemContainer.setAttribute("tabindex", needsScroll ? "0" : "-1");
            itemContainer.setAttribute("aria-label", needsScroll ? "News archive, scroll for more" : "News");

            if (needsScroll) {
                var visibleHeight = allRows.slice(0, expandedVisible).reduce(function (height, item) {
                    return height + item.getBoundingClientRect().height;
                }, 0);
                itemContainer.style.maxHeight = Math.ceil(visibleHeight) + "px";
            }
        }

        button.addEventListener("click", function () {
            var expanded = button.getAttribute("aria-expanded") === "true";
            itemContainer.querySelectorAll(".news-extra").forEach(function (item) {
                item.hidden = expanded;
            });
            button.setAttribute("aria-expanded", String(!expanded));
            button.innerHTML = expanded
                ? 'Show more'
                : 'Show less <span class="news-toggle-arrow" aria-hidden="true">\u2191</span>';
            itemContainer.scrollTop = 0;
            updateScrollLimit();
        });

        window.addEventListener("resize", function () {
            if (button.getAttribute("aria-expanded") === "true") updateScrollLimit();
        });
    }

    renderNews();
})();
