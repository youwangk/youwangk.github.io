(function () {
    var page = document.body;
    var nav = document.getElementById('site-nav');
    var hero = document.querySelector('.hero');
    var hamburger = document.querySelector('.nav-hamburger');
    var navLinks = document.querySelector('.nav-links');

    page.classList.add('js-ready');

    if (nav && hero && 'IntersectionObserver' in window) {
        var navObserver = new IntersectionObserver(function (entries) {
            nav.classList.toggle('visible', !entries[0].isIntersecting);
        });
        navObserver.observe(hero);
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            var expanded = navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(expanded));
        });

        navLinks.addEventListener('click', function (event) {
            if (event.target.closest('a')) {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.site-nav')) {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if ('IntersectionObserver' in window) {
        var fadeObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

        document.querySelectorAll('.fade-in').forEach(function (element) {
            fadeObserver.observe(element);
        });
    } else {
        document.querySelectorAll('.fade-in').forEach(function (element) {
            element.classList.add('visible');
        });
        if (nav) nav.classList.add('visible');
    }
})();
