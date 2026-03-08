/* ============================================================
   LIFETWIN — Create Twin JavaScript (Multi-Step Form)
   ============================================================ */

(function () {
    'use strict';

    var currentStep = 0;
    var sections, dots, connectors, btnPrev, btnNext;

    /* ── Init ──────────────────────────────────────────────── */
    function init() {
        sections = document.querySelectorAll('.twin-form__section');
        dots = document.querySelectorAll('.step-progress__dot');
        connectors = document.querySelectorAll('.step-progress__connector');
        btnPrev = document.getElementById('twin-prev');
        btnNext = document.getElementById('twin-next');

        if (!sections.length) return;

        btnPrev && btnPrev.addEventListener('click', prevStep);
        btnNext && btnNext.addEventListener('click', nextStep);

        initRangeSliders();
        initPillSelects();
        showStep(0);
    }

    /* ── Show Step ─────────────────────────────────────────── */
    function showStep(index) {
        currentStep = index;

        // Toggle section visibility
        sections.forEach(function (s, i) {
            s.classList.toggle('active', i === index);
        });

        // Update progress dots
        dots.forEach(function (dot, i) {
            var parent = dot.closest('.step-progress__step');
            dot.classList.remove('active', 'done');
            if (parent) parent.classList.remove('active', 'done');

            if (i < index) {
                dot.classList.add('done');
                dot.innerHTML = '✓';
                if (parent) parent.classList.add('done');
            } else if (i === index) {
                dot.classList.add('active');
                dot.textContent = i + 1;
                if (parent) parent.classList.add('active');
            } else {
                dot.textContent = i + 1;
            }
        });

        // Update connectors
        connectors.forEach(function (c, i) {
            c.classList.toggle('done', i < index);
        });

        // Button states
        if (btnPrev) btnPrev.style.visibility = index === 0 ? 'hidden' : 'visible';
        if (btnNext) {
            var isLast = index === sections.length - 1;
            btnNext.innerHTML = isLast
                ? '<i data-lucide="sparkles"></i> Create Twin'
                : 'Next <i data-lucide="arrow-right"></i>';
            btnNext.type = isLast ? 'submit' : 'button';
            if (window.lucide) lucide.createIcons();
        }

        // Build summary on last step
        if (index === sections.length - 1) buildSummary();
    }

    function nextStep() {
        if (currentStep < sections.length - 1) showStep(currentStep + 1);
    }

    function prevStep() {
        if (currentStep > 0) showStep(currentStep - 1);
    }

    /* ── Range Sliders ─────────────────────────────────────── */
    function initRangeSliders() {
        document.querySelectorAll('input[type="range"]').forEach(function (range) {
            var output = document.getElementById(range.id + '-val');
            if (!output) return;
            var suffix = range.getAttribute('data-suffix') || '';

            function update() {
                output.textContent = range.value + suffix;
            }

            range.addEventListener('input', update);
            update();
        });
    }

    /* ── Pill Selects ──────────────────────────────────────── */
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

    /* ── Build Summary ─────────────────────────────────────── */
    function buildSummary() {
        var map = {
            'summary-age': 'twin-age',
            'summary-weight': 'twin-weight',
            'summary-height': 'twin-height',
            'summary-sleep': 'twin-sleep',
            'summary-exercise': 'twin-exercise',
            'summary-water': 'twin-water',
            'summary-stress': 'twin-stress',
            'summary-screen': 'twin-screen',
        };

        Object.keys(map).forEach(function (summaryId) {
            var target = document.getElementById(summaryId);
            var source = document.getElementById(map[summaryId]);
            if (!target || !source) return;

            var suffix = source.getAttribute('data-suffix') || '';
            target.textContent = source.value + suffix;
        });

        // Pill select values
        document.querySelectorAll('.pill-select').forEach(function (group) {
            var selected = group.querySelector('.pill-select__option.selected');
            var summaryId = group.getAttribute('data-summary');
            var target = document.getElementById(summaryId);
            if (target && selected) {
                target.textContent = selected.textContent.trim();
            }
        });
    }

    /* ── Bootstrap ─────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', init);
})();
