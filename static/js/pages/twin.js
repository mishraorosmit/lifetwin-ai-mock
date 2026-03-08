/* ============================================================
   LIFETWIN — pages/twin.js
   ============================================================
   RESPONSIBILITY:
   • Multi-step form wizard (Next / Back navigation)
   • Step-progress dots and connector updates
   • Range slider live-value display
   • Pill-select (radio button) toggle interactions
   • Review summary builder on the final step
   • Loaded on the create-twin page (/twin/create/)
   ============================================================ */

(function () {
    'use strict';

    var currentStep = 0;
    var sections, dots, connectors, btnPrev, btnNext;

    /* ── Show Step ────────────────────────────────────────── */
    function showStep(index) {
        currentStep = index;

        sections.forEach(function (s, i) { s.classList.toggle('active', i === index); });

        dots.forEach(function (dot, i) {
            var parent = dot.closest('.step-progress__step');
            dot.classList.remove('active', 'done');
            if (parent) parent.classList.remove('active', 'done');

            if (i < index) {
                dot.classList.add('done'); dot.innerHTML = '✓';
                if (parent) parent.classList.add('done');
            } else if (i === index) {
                dot.classList.add('active'); dot.textContent = i + 1;
                if (parent) parent.classList.add('active');
            } else {
                dot.textContent = i + 1;
            }
        });

        connectors.forEach(function (c, i) { c.classList.toggle('done', i < index); });

        if (btnPrev) btnPrev.style.visibility = index === 0 ? 'hidden' : 'visible';
        if (btnNext) {
            var isLast = index === sections.length - 1;
            btnNext.innerHTML = isLast
                ? '<i data-lucide="sparkles"></i> Create Twin'
                : 'Next <i data-lucide="arrow-right"></i>';
            btnNext.type = isLast ? 'submit' : 'button';
            if (window.lucide) lucide.createIcons();
        }

        if (index === sections.length - 1) buildSummary();
    }

    /* ── Range Sliders ────────────────────────────────────── */
    function initRangeSliders() {
        document.querySelectorAll('input[type="range"]').forEach(function (range) {
            var output = document.getElementById(range.id + '-val');
            if (!output) return;
            var suffix = range.getAttribute('data-suffix') || '';

            function update() { output.textContent = range.value + suffix; }

            range.addEventListener('input', update);
            update();
        });
    }

    /* ── Pill Selects ─────────────────────────────────────── */
    function initPillSelects() {
        document.querySelectorAll('.pill-select').forEach(function (group) {
            var pills = group.querySelectorAll('.pill-select__option');
            pills.forEach(function (pill) {
                pill.addEventListener('click', function () {
                    pills.forEach(function (p) { p.classList.remove('selected'); });
                    pill.classList.add('selected');
                    var radio = pill.querySelector('input[type="radio"]');
                    if (radio) radio.checked = true;
                });
            });
        });
    }

    /* ── Build Summary ────────────────────────────────────── */
    function buildSummary() {
        var map = {
            'summary-age': 'twin-age', 'summary-weight': 'twin-weight',
            'summary-height': 'twin-height', 'summary-sleep': 'twin-sleep',
            'summary-exercise': 'twin-exercise', 'summary-water': 'twin-water',
            'summary-stress': 'twin-stress', 'summary-screen': 'twin-screen',
        };

        Object.keys(map).forEach(function (sid) {
            var target = document.getElementById(sid);
            var source = document.getElementById(map[sid]);
            if (!target || !source) return;
            target.textContent = source.value + (source.getAttribute('data-suffix') || '');
        });

        document.querySelectorAll('.pill-select').forEach(function (group) {
            var sel = group.querySelector('.pill-select__option.selected');
            var tid = group.getAttribute('data-summary');
            var t = document.getElementById(tid);
            if (t && sel) t.textContent = sel.textContent.trim();
        });
    }

    /* ── Init ─────────────────────────────────────────────── */
    function initPage() {
        sections = document.querySelectorAll('.twin-form__section');
        dots = document.querySelectorAll('.step-progress__dot');
        connectors = document.querySelectorAll('.step-progress__connector');
        btnPrev = document.getElementById('twin-prev');
        btnNext = document.getElementById('twin-next');

        if (!sections.length) return;

        btnPrev && btnPrev.addEventListener('click', function () {
            if (currentStep > 0) showStep(currentStep - 1);
        });
        btnNext && btnNext.addEventListener('click', function () {
            if (currentStep < sections.length - 1) showStep(currentStep + 1);
        });

        initRangeSliders();
        initPillSelects();
        showStep(0);
        console.log('[LifeTwin] pages/twin.js initialized');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initPage();
    });
})();
