/* ============================================================
   LIFETWIN — core/navbar.js
   ============================================================
   Navbar interaction module — runs on EVERY page.

   RESPONSIBILITIES:
   ✦ Mobile hamburger menu toggle (open / close)
   ✦ Close mobile menu when a nav link is clicked
   ✦ Scroll behavior — glassmorphism background on scroll
   ✦ Hide-on-scroll-down / show-on-scroll-up (smart navbar)
   ✦ Active link highlight based on current URL
   ============================================================ */

(function () {
    'use strict';

    /* ══════════════════════════════════════════════════════════
       1.  MOBILE MENU TOGGLE
       ══════════════════════════════════════════════════════════ */
    function initMobileNav() {
        var toggle = document.getElementById('nav-toggle');
        var menu = document.getElementById('nav-menu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));

            // Prevent body scroll while menu is open
            document.body.classList.toggle('nav-open', isOpen);
        });

        // Close menu when any link inside it is clicked
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            });
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menu.classList.contains('open')) {
                menu.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            }
        });
    }

    /* ══════════════════════════════════════════════════════════
       2.  SCROLL BEHAVIOR
       ──────────────────────────────────────────────────────────
       • Adds .navbar--scrolled when page scrolls past 60 px
         (used for glassmorphism background in CSS)
       • Adds .navbar--hidden when user scrolls DOWN and
         removes it when user scrolls UP (smart hide)
       ══════════════════════════════════════════════════════════ */
    function initScrollBehavior() {
        var navbar = document.querySelector('.navbar, .nav, header');
        if (!navbar) return;

        var lastScrollY = 0;
        var scrollThreshold = 60;
        var hideThreshold = 300; // only start hiding after 300px
        var ticking = false;

        function onScroll() {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(function () {
                var currentY = window.scrollY;

                /* ── glassmorphism toggle ─────────────────── */
                if (currentY > scrollThreshold) {
                    navbar.classList.add('navbar--scrolled');
                } else {
                    navbar.classList.remove('navbar--scrolled');
                }

                /* ── smart hide / show ───────────────────── */
                if (currentY > hideThreshold) {
                    if (currentY > lastScrollY + 5) {
                        // scrolling DOWN → hide
                        navbar.classList.add('navbar--hidden');
                    } else if (currentY < lastScrollY - 5) {
                        // scrolling UP → show
                        navbar.classList.remove('navbar--hidden');
                    }
                } else {
                    navbar.classList.remove('navbar--hidden');
                }

                lastScrollY = currentY;
                ticking = false;
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // set initial state
    }

    /* ══════════════════════════════════════════════════════════
       3.  ACTIVE LINK HIGHLIGHT
       ──────────────────────────────────────────────────────────
       Compares each nav link's href against the current path.
       Adds .active to the matching link so CSS can style it.
       ══════════════════════════════════════════════════════════ */
    function highlightActiveLink() {
        var currentPath = window.location.pathname;
        var links = document.querySelectorAll('.nav__link, .nav-menu a, .navbar a');

        links.forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href) return;

            // Remove trailing slashes for comparison
            var hrefClean = href.replace(/\/+$/, '') || '/';
            var pathClean = currentPath.replace(/\/+$/, '') || '/';

            // Exact match or prefix match (except root /)
            var isActive = pathClean === hrefClean ||
                (hrefClean !== '/' && pathClean.startsWith(hrefClean));

            link.classList.toggle('active', isActive);
        });
    }

    /* ══════════════════════════════════════════════════════════
       4.  BOOTSTRAP
       ══════════════════════════════════════════════════════════ */
    function initPage() {
        initMobileNav();
        initScrollBehavior();
        highlightActiveLink();
        console.log('[LifeTwin] core/navbar.js initialized');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initPage();
    });
})();
