/* ============================================================
   LIFETWIN — pages/simulation.js
   ============================================================
   RESPONSIBILITY:
   • Scenario card selection (sleep/fitness/stress/custom)
   • Toggle parameter sections based on selected scenario
   • Range slider live values with color-coded feedback
   • Run Simulation button with loading state
   • Loaded on the simulation page (/simulation/)
   ============================================================ */

(function () {
    'use strict';

    /* ── Scenario Cards ───────────────────────────────────── */
    function initScenarioCards() {
        var cards = document.querySelectorAll('.scenario-card');
        cards.forEach(function (card) {
            card.addEventListener('click', function () {
                cards.forEach(function (c) { c.classList.remove('selected'); });
                card.classList.add('selected');
                var radio = card.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
                showParamsForScenario(card.getAttribute('data-scenario'));
            });
        });
    }

    /* ── Toggle Param Sections ────────────────────────────── */
    function showParamsForScenario(scenario) {
        var all = document.querySelectorAll('.param-section[data-scenario]');
        var custom = document.querySelector('.param-section[data-scenario="custom"]');

        all.forEach(function (s) { s.style.display = 'none'; });

        var target = document.querySelector('.param-section[data-scenario="' + scenario + '"]');
        if (target) target.style.display = 'block';
        else if (custom) custom.style.display = 'block';
    }

    /* ── Param Sliders ────────────────────────────────────── */
    function initParamSliders() {
        document.querySelectorAll('.param-row__slider input[type="range"]').forEach(function (range) {
            var output = document.getElementById(range.id + '-val');
            if (!output) return;
            var suffix = range.getAttribute('data-suffix') || '';

            function update() {
                output.textContent = range.value + suffix;

                var current = parseFloat(range.getAttribute('data-current') || range.min);
                var val = parseFloat(range.value);
                var better = range.getAttribute('data-better') || 'higher';

                if (better === 'higher') {
                    output.style.color = val > current ? 'var(--color-success)'
                        : val < current ? 'var(--color-danger)' : 'var(--color-text-muted)';
                } else {
                    output.style.color = val < current ? 'var(--color-success)'
                        : val > current ? 'var(--color-danger)' : 'var(--color-text-muted)';
                }
            }

            range.addEventListener('input', update);
            update();
        });
    }

    /* ── Run Button ───────────────────────────────────────── */
    function initRunButton() {
        var btn = document.getElementById('sim-run-btn');
        var form = document.getElementById('simulation-form');
        if (!btn || !form) return;

        btn.addEventListener('click', function (e) {
            e.preventDefault();

            if (window.LifeTwin && window.LifeTwin.api) {
                window.LifeTwin.api.setLoading(btn, true, 'Running Simulation...');
            } else {
                btn.classList.add('loading');
                btn.innerHTML = '<span>Running Simulation...</span>';
            }

            setTimeout(function () { form.submit(); }, 800);
        });
    }

    /* ── Init ─────────────────────────────────────────────── */
    function initPage() {
        initScenarioCards();
        initParamSliders();
        initRunButton();

        var first = document.querySelector('.scenario-card');
        if (first) first.click();

        console.log('[LifeTwin] pages/simulation.js initialized');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initPage();
    });
})();
