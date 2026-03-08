/* ============================================================
   LIFETWIN — Simulation Page JavaScript
   ============================================================ */

(function () {
    'use strict';

    /* ── Scenario Card Selection ───────────────────────────── */
    function initScenarioCards() {
        var cards = document.querySelectorAll('.scenario-card');
        cards.forEach(function (card) {
            card.addEventListener('click', function () {
                cards.forEach(function (c) { c.classList.remove('selected'); });
                card.classList.add('selected');
                var radio = card.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
                // Show relevant param section
                showParamsForScenario(card.getAttribute('data-scenario'));
            });
        });
    }

    /* ── Show Params for Selected Scenario ─────────────────── */
    function showParamsForScenario(scenario) {
        var allSections = document.querySelectorAll('.param-section[data-scenario]');
        var customSection = document.querySelector('.param-section[data-scenario="custom"]');
        allSections.forEach(function (s) {
            s.style.display = 'none';
        });

        // Show the matching section, or custom as fallback
        var target = document.querySelector('.param-section[data-scenario="' + scenario + '"]');
        if (target) {
            target.style.display = 'block';
        } else if (customSection) {
            customSection.style.display = 'block';
        }
    }

    /* ── Range Slider Live Values ──────────────────────────── */
    function initParamSliders() {
        document.querySelectorAll('.param-row__slider input[type="range"]').forEach(function (range) {
            var output = document.getElementById(range.id + '-val');
            if (!output) return;
            var suffix = range.getAttribute('data-suffix') || '';

            function update() {
                output.textContent = range.value + suffix;

                // Color coding: green if improved, warning if same, red if worse
                var current = parseFloat(range.getAttribute('data-current') || range.min);
                var val = parseFloat(range.value);
                var betterDirection = range.getAttribute('data-better') || 'higher';

                if (betterDirection === 'higher') {
                    if (val > current) output.style.color = 'var(--color-success)';
                    else if (val < current) output.style.color = 'var(--color-danger)';
                    else output.style.color = 'var(--color-text-muted)';
                } else {
                    if (val < current) output.style.color = 'var(--color-success)';
                    else if (val > current) output.style.color = 'var(--color-danger)';
                    else output.style.color = 'var(--color-text-muted)';
                }
            }

            range.addEventListener('input', update);
            update();
        });
    }

    /* ── Run Simulation ────────────────────────────────────── */
    function initRunButton() {
        var btn = document.getElementById('sim-run-btn');
        var form = document.getElementById('simulation-form');
        if (!btn || !form) return;

        btn.addEventListener('click', function (e) {
            e.preventDefault();

            // Show loading state
            btn.classList.add('loading');
            btn.innerHTML = '<span>Running Simulation...</span>';

            // Brief visual delay, then submit the form to Django.
            // Django runs the engine, saves the SimulationScenario, stores the
            // result PK in session, then redirects to /simulation/result/.
            setTimeout(function () {
                form.submit();
            }, 800);
        });
    }

    /* ── Bootstrap ─────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        initScenarioCards();
        initParamSliders();
        initRunButton();

        // Auto-select first scenario
        var first = document.querySelector('.scenario-card');
        if (first) first.click();
    });
})();
