/* Homepage publication renderer. Data lives in publications-data.js. */
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

    function formatAuthors(authors) {
        return escapeHtml(authors).replace(/Kim Youwang/g, "<u>Kim Youwang</u>");
    }

    function renderPublications() {
        var container = document.getElementById("publication-list");
        var database = window.PUBLICATIONS_DB;

        if (!container) return;
        if (!database || !Array.isArray(database.items)) {
            container.innerHTML = '<p class="noscript-message">Publication data could not be loaded.</p>';
            return;
        }

        container.innerHTML = database.items.map(function (item) {
            var venue = escapeHtml(item.venue);
            if (item.websiteNote) {
                venue += ' (<span style="color:#c00000;">' +
                    escapeHtml(item.websiteNote) + "</span>)";
            }

            var links = (item.links || []).map(function (link) {
                return '<a class="pub-link" href="' + escapeHtml(link.url) +
                    '" target="_blank" rel="noopener noreferrer">' +
                    escapeHtml(link.name) + "</a>";
            }).join("");

            return [
                '<article class="item">',
                '<img src="' + escapeHtml(item.image) + '" alt="' +
                    escapeHtml(item.title) + ' teaser" loading="lazy" decoding="async">',
                "<p>",
                '<span class="pub-title">' + escapeHtml(item.title) + "</span>",
                venue ? '<span class="pub-venue">' + venue + "</span>" : "",
                item.authors ? '<span class="pub-authors">' + formatAuthors(item.authors) + "</span>" : "",
                links ? '<span class="pub-links">' + links + "</span>" : "",
                "</p>",
                "</article>"
            ].join("");
        }).join("");
    }

    document.addEventListener("DOMContentLoaded", renderPublications);
})();
