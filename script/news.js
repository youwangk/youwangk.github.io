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

        var visibleCount = Math.max(1, Number(database.visibleCount) || 5);
        var items = database.items.slice().sort(function (a, b) {
            return String(b.date).localeCompare(String(a.date));
        });

        var rows = items.map(function (item) {
            var title = escapeHtml(item.title);
            var content = item.url
                ? '<a href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener noreferrer">' + title + '</a>'
                : title;
            var badge = item.isNew ? '<span class="news-badge">New</span>' : "";

            return [
                '<article class="news-item">',
                '<time class="news-date" datetime="' + escapeHtml(item.date) + '">' + escapeHtml(formatDate(item.date)) + '</time>',
                '<p class="news-copy">' + badge + content + '</p>',
                '</article>'
            ].join("");
        }).join("");

        container.innerHTML = '<div class="news-items" id="news-items">' + rows + '</div>';

        var itemContainer = container.querySelector(".news-items");

        function updateScrollLimit() {
            var allRows = Array.prototype.slice.call(itemContainer.querySelectorAll(".news-item"));
            var needsScroll = allRows.length > visibleCount;

            itemContainer.classList.toggle("is-scrollable", needsScroll);
            itemContainer.style.maxHeight = "";
            if (!needsScroll) return;

            itemContainer.setAttribute("tabindex", "0");
            itemContainer.setAttribute("aria-label", "News, scroll for more");
            var visibleHeight = allRows.slice(0, visibleCount).reduce(function (height, item) {
                return height + item.getBoundingClientRect().height;
            }, 0);
            itemContainer.style.maxHeight = Math.ceil(visibleHeight) + "px";
        }

        updateScrollLimit();
        window.addEventListener("resize", updateScrollLimit);
    }

    renderNews();
})();
