/* ============================================================
   LIFETWIN — core/app.js
   ============================================================
   Global application bootstrap — runs on EVERY page.

   RESPONSIBILITIES:
   ✦ Expose the window.LifeTwin namespace
   ✦ Detect the current page type from the URL
   ✦ Provide shared helpers (onReady, getCsrfToken, apiFetch)
   ✦ Scroll-reveal all .fade-in elements via IntersectionObserver
   ✦ Auto-initialize animations after the DOM is ready
   ============================================================ */

(function () {
    'use strict';

    /* ══════════════════════════════════════════════════════════
       1.  NAMESPACE
       ══════════════════════════════════════════════════════════ */
    window.LifeTwin = window.LifeTwin || {};

    /* ══════════════════════════════════════════════════════════
       2.  PAGE TYPE DETECTION
       ──────────────────────────────────────────────────────────
       Maps the current URL pathname to a simple page key so
       that page-specific scripts can gate their initialisation.

       Examples:
         /                 → 'landing'
         /login/           → 'login'
         /register/        → 'register'
         /twin/create/     → 'twin-create'
         /twin/edit/       → 'twin-edit'
         /simulation/      → 'simulation'
         /simulation/result/ → 'result'
         /dashboard/       → 'dashboard'
         /features/        → 'features'
         /about/           → 'about'
       ══════════════════════════════════════════════════════════ */
    function detectPageType() {
        var path = window.location.pathname.replace(/\/+$/, '') || '/';

        var map = {
            '/': 'landing',
            '/login': 'login',
            '/register': 'register',
            '/twin/create': 'twin-create',
            '/twin/edit': 'twin-edit',
            '/twin/overview': 'twin-overview',
            '/simulation': 'simulation',
            '/simulation/result': 'result',
            '/simulation/history': 'simulation-history',
            '/dashboard': 'dashboard',
            '/dashboard/health': 'health-analytics',
            '/dashboard/stress': 'stress-analytics',
            '/features': 'features',
            '/about': 'about',
            '/profile': 'profile',
            '/profile/edit': 'profile-edit',
        };

        return map[path] || 'unknown';
    }

    /* ══════════════════════════════════════════════════════════
       3.  DOM READY HELPER
       ══════════════════════════════════════════════════════════ */
    function onReady(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    /* ══════════════════════════════════════════════════════════
       4.  CSRF TOKEN HELPER  (Django)
       ══════════════════════════════════════════════════════════ */
    function getCsrfToken() {
        var cookie = document.cookie
            .split('; ')
            .find(function (row) { return row.startsWith('csrftoken='); });
        return cookie ? cookie.split('=')[1] : '';
    }

    /* ══════════════════════════════════════════════════════════
       5.  FETCH WRAPPER WITH CSRF
       ══════════════════════════════════════════════════════════ */
    function apiFetch(url, options) {
        options = options || {};
        var defaults = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken(),
            },
        };
        var merged = Object.assign({}, defaults, options);
        merged.headers = Object.assign({}, defaults.headers, options.headers || {});
        return fetch(url, merged);
    }

    /* ══════════════════════════════════════════════════════════
       6.  SCROLL REVEAL  (IntersectionObserver)
       ──────────────────────────────────────────────────────────
       Every element with class .fade-in gets class .visible
       when it first scrolls into the viewport.
       ══════════════════════════════════════════════════════════ */
    function initScrollReveal() {
        var targets = document.querySelectorAll('.fade-in');
        if (!targets.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        targets.forEach(function (el) { observer.observe(el); });
    }

    /* ══════════════════════════════════════════════════════════
       7.  INITIALIZE ANIMATIONS
       ──────────────────────────────────────────────────────────
       If core/animations.js has registered helpers on the
       LifeTwin.animate namespace, trigger any page-wide
       animations that should run automatically.
       ══════════════════════════════════════════════════════════ */
    function initAnimations() {
        // Auto-animate any data-count counters on the page
        if (window.LifeTwin.animate && window.LifeTwin.animate.autoCounters) {
            window.LifeTwin.animate.autoCounters();
        }

        // Auto-animate any progress / bar-fill elements
        if (window.LifeTwin.animate && window.LifeTwin.animate.autoProgressBars) {
            window.LifeTwin.animate.autoProgressBars();
        }
    }

    /* ══════════════════════════════════════════════════════════
       8.  EXPOSE GLOBAL NAMESPACE
       ══════════════════════════════════════════════════════════ */
    window.LifeTwin.page = detectPageType();
    window.LifeTwin.onReady = onReady;
    window.LifeTwin.getCsrfToken = getCsrfToken;
    window.LifeTwin.apiFetch = apiFetch;

    /* ══════════════════════════════════════════════════════════
       9.  BOOTSTRAP
       ══════════════════════════════════════════════════════════ */
    function initPage() {
        initScrollReveal();
        initAnimations();
        console.log('[LifeTwin] core/app.js → page: "' + window.LifeTwin.page + '"');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initPage();
    });
})();
