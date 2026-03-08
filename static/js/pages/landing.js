/* ============================================================
   LIFETWIN — pages/landing.js
   ============================================================
   Landing page interactions — runs only on  /

   FEATURES IMPLEMENTED:
   ✦ 1. Hero typing animation   (#hero-typed)
   ✦ 2. Animated statistics      ([data-count] in #stats)
   ✦ 3. Scroll fade-in sections  (.fade-in + .feature-card + .step-card)
   ✦ 4. Simulation preview bars  (.sim-preview__bar-fill)
   ✦ 5. Smooth scrolling         (anchor links → scroll-behavior)

   All animations are lightweight:
   • IntersectionObserver for scroll triggers (no scroll listeners)
   • requestAnimationFrame for number counting (not setInterval)
   • CSS transitions for bar fills (GPU-accelerated)
   • No backend communication — purely cosmetic
   ============================================================ */

(function () {
    'use strict';

    /* ══════════════════════════════════════════════════════════
       1.  HERO TYPING ANIMATION
       ──────────────────────────────────────────────────────────
       Cycles through keywords in #hero-typed with a typewriter
       effect: type → pause → delete → next word.
       ══════════════════════════════════════════════════════════ */
    function initTypewriter() {
        var el = document.getElementById('hero-typed');
        if (!el) return;

        var words = ['Decisions', 'Health', 'Career', 'Lifestyle', 'Future'];
        var wordIndex = 0;
        var charIndex = 0;
        var isDeleting = false;

        // Add blinking cursor via CSS class
        el.classList.add('typewriter-cursor');

        function type() {
            var current = words[wordIndex];

            if (isDeleting) {
                charIndex--;
                el.textContent = current.substring(0, charIndex);
            } else {
                charIndex++;
                el.textContent = current.substring(0, charIndex);
            }

            // Speed: typing is slower than deleting
            var delay = isDeleting ? 50 : 110;

            if (!isDeleting && charIndex === current.length) {
                // Finished typing — pause, then start deleting
                delay = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting — move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 400;
            }

            setTimeout(type, delay);
        }

        // Small initial delay so the hero fades in first
        setTimeout(type, 600);
    }

    /* ══════════════════════════════════════════════════════════
       2.  ANIMATED STATISTICS COUNTER
       ──────────────────────────────────────────────────────────
       Observes every [data-count] element in #stats.
       When it scrolls into view, counts from 0 → target with
       an ease-out cubic curve using requestAnimationFrame.

       Reads:
         data-count   — numeric target  (e.g. 12500)
         data-suffix  — appended string (e.g. '+', '%')
       ══════════════════════════════════════════════════════════ */
    function initStatCounters() {
        var counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    var el = entry.target;
                    var target = parseInt(el.getAttribute('data-count'), 10);
                    var suffix = el.getAttribute('data-suffix') || '';
                    var duration = 1800;
                    var start = performance.now();

                    function tick(now) {
                        var elapsed = now - start;
                        var progress = Math.min(elapsed / duration, 1);

                        // Ease-out cubic: decelerates smoothly
                        var eased = 1 - Math.pow(1 - progress, 3);
                        var value = Math.round(target * eased);

                        el.textContent = value.toLocaleString() + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(tick);
                        }
                    }

                    requestAnimationFrame(tick);
                    observer.unobserve(el);
                });
            },
            { threshold: 0.4 }
        );

        counters.forEach(function (el) { observer.observe(el); });
    }

    /* ══════════════════════════════════════════════════════════
       3.  SCROLL FADE-IN SECTIONS
       ──────────────────────────────────────────────────────────
       Applies a staggered reveal to feature cards and step
       cards. Uses IntersectionObserver — no scroll listener.

       The core/app.js scroll-reveal handles generic .fade-in
       elements. This function adds staggered timing to the
       card groups specifically on the landing page.
       ══════════════════════════════════════════════════════════ */
    function initScrollFadeIn() {
        // Stagger feature cards
        observeAndStagger('.features-grid .feature-card', 120);

        // Stagger step cards
        observeAndStagger('.steps-track .step-card', 150);
    }

    /**
     * Observe a parent container and stagger-reveal its children.
     * @param {string} selector   — child element selector
     * @param {number} staggerMs  — delay between each child (ms)
     */
    function observeAndStagger(selector, staggerMs) {
        var items = document.querySelectorAll(selector);
        if (!items.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    // Find the index of this item to calculate stagger
                    var idx = Array.prototype.indexOf.call(items, entry.target);
                    var delay = idx * staggerMs;

                    setTimeout(function () {
                        entry.target.classList.add('visible');
                        entry.target.style.transitionDelay = '0ms'; // reset after reveal
                    }, delay);

                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
        );

        items.forEach(function (el) { observer.observe(el); });
    }

    /* ══════════════════════════════════════════════════════════
       4.  SIMULATION PREVIEW PROGRESS BARS
       ──────────────────────────────────────────────────────────
       Animates .sim-preview__bar-fill elements from width: 0
       to their data-width value when the sim-preview section
       scrolls into view.

       Uses a single observer on the parent section so all bars
       animate together with a sequential stagger.
       ══════════════════════════════════════════════════════════ */
    function initSimPreviewBars() {
        var section = document.getElementById('sim-preview');
        if (!section) return;

        var bars = section.querySelectorAll('.sim-preview__bar-fill');
        if (!bars.length) return;

        // Ensure bars start at 0 width
        bars.forEach(function (bar) { bar.style.width = '0%'; });

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    bars.forEach(function (bar, i) {
                        var targetWidth = bar.getAttribute('data-width') || '0%';

                        // Stagger each bar with a slight delay
                        setTimeout(function () {
                            bar.style.transition = 'width 1s cubic-bezier(0.22, 1, 0.36, 1)';
                            bar.style.width = targetWidth;
                        }, 300 + i * 200);
                    });

                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(section);
    }

    /* ══════════════════════════════════════════════════════════
       5.  SMOOTH SCROLLING
       ──────────────────────────────────────────────────────────
       Intercepts clicks on anchor links (href="#section-id")
       and scrolls smoothly instead of jumping. Works for:
         • Navbar links pointing to #features-preview, #stats, etc.
         • CTA buttons with in-page anchors
         • "See How It Works" link

       Falls back to native behavior if target doesn't exist.
       ══════════════════════════════════════════════════════════ */
    function initSmoothScrolling() {
        // Enable CSS smooth scrolling as a baseline
        document.documentElement.style.scrollBehavior = 'smooth';

        // Enhanced JS-powered smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                var hash = this.getAttribute('href');
                if (!hash || hash === '#') return; // skip empty anchors

                var target = document.querySelector(hash);
                if (!target) return; // target doesn't exist, let browser handle

                e.preventDefault();

                // Account for fixed navbar height
                var navbar = document.querySelector('.navbar, .nav, header');
                var navbarHeight = navbar ? navbar.offsetHeight : 0;
                var offsetTop = target.getBoundingClientRect().top + window.scrollY;

                window.scrollTo({
                    top: offsetTop - navbarHeight - 20, // 20px breathing room
                    behavior: 'smooth',
                });

                // Update URL hash without jumping
                if (window.history && window.history.pushState) {
                    window.history.pushState(null, '', hash);
                }
            });
        });
    }

    /* ══════════════════════════════════════════════════════════
       BOOTSTRAP
       ══════════════════════════════════════════════════════════ */
    function initPage() {
        initTypewriter();
        initStatCounters();
        initScrollFadeIn();
        initSimPreviewBars();
        initSmoothScrolling();
        console.log('[LifeTwin] pages/landing.js initialized');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initPage();
    });
})();
