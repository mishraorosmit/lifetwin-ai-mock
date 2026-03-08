/* ============================================================
   LIFETWIN — Dashboard JavaScript
   ============================================================
   All data is mock — replace with API calls in production.
   ============================================================ */

(function () {
    'use strict';

    /* ── Mock Dashboard Data ───────────────────────────────── */
    var DATA = {
        // Quick stats
        healthScore: 82,
        stressLevel: 3.2,
        totalSims: 24,
        twinAge: '12 wks',

        // Health trend (30 days)
        trendLabels: ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Feb 1',
            'Feb 5', 'Feb 10', 'Feb 15', 'Feb 20', 'Feb 25', 'Mar 1'],
        healthData: [58, 61, 60, 65, 68, 71, 72, 74, 76, 78, 79, 81, 82],
        stressData: [7.8, 7.2, 7.5, 6.8, 6.2, 5.8, 5.5, 5.0, 4.6, 4.2, 3.8, 3.5, 3.2],
        energyData: [42, 45, 44, 50, 53, 58, 60, 63, 66, 70, 72, 74, 76],

        // Lifestyle distribution (doughnut)
        lifestyleLabels: ['Sleep', 'Exercise', 'Nutrition', 'Hydration', 'Mental Health'],
        lifestyleValues: [78, 72, 65, 85, 60],
        lifestyleColors: ['#06d6f2', '#818cf8', '#34d399', '#fbbf24', '#f87171'],

        // Lifestyle bars
        lifestyle: [
            { name: 'Sleep Quality', value: '7.2h', pct: 72 },
            { name: 'Exercise', value: '5x/wk', pct: 71 },
            { name: 'Hydration', value: '8 gl', pct: 85 },
            { name: 'Screen Time', value: '4.5h', pct: 56 },
            { name: 'Stress Mgmt', value: '6/10', pct: 60 },
        ],

        // History
        history: [
            { scenario: 'Sleep Optimization', date: '2 hours ago', score: 82, type: 'success' },
            { scenario: 'Fitness Boost', date: 'Yesterday', score: 76, type: 'accent' },
            { scenario: 'Stress Reduction', date: '3 days ago', score: 71, type: 'warning' },
            { scenario: 'Custom Simulation', date: '1 week ago', score: 68, type: 'accent' },
            { scenario: 'Sleep + Exercise', date: '2 weeks ago', score: 74, type: 'success' },
        ],

        // Twin stats
        twin: [
            { label: 'Created', value: '12 weeks ago' },
            { label: 'Last Synced', value: 'Just now' },
            { label: 'Parameters', value: '10 active' },
            { label: 'Health Trend', value: '↑ Improving' },
            { label: 'Best Score', value: '82/100' },
        ],
    };

    /* ── Animate Quick Stats ───────────────────────────────── */
    function animateQuickStats() {
        animateCounter('qs-health', DATA.healthScore, '%');
        animateCounter('qs-stress', DATA.stressLevel, '/10', true);
        animateCounter('qs-sims', DATA.totalSims, '');
    }

    function animateCounter(id, target, suffix, isFloat) {
        var el = document.getElementById(id);
        if (!el) return;
        var start = performance.now();
        var dur = 1400;
        function tick(now) {
            var p = Math.min((now - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            var val = target * eased;
            el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    /* ── Health Trend Chart ────────────────────────────────── */
    function renderTrendChart() {
        var ctx = document.getElementById('dash-trend-chart');
        if (!ctx || typeof Chart === 'undefined') return;

        window._dashTrendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: DATA.trendLabels,
                datasets: [
                    {
                        label: 'Health Score',
                        data: DATA.healthData,
                        borderColor: '#34d399',
                        backgroundColor: createGradient(ctx, '#34d399'),
                        fill: true,
                        tension: 0.4,
                        pointRadius: 3,
                        pointHoverRadius: 6,
                        pointBackgroundColor: '#34d399',
                        borderWidth: 2,
                    },
                    {
                        label: 'Energy Level',
                        data: DATA.energyData,
                        borderColor: '#fbbf24',
                        backgroundColor: 'transparent',
                        fill: false,
                        tension: 0.4,
                        pointRadius: 2,
                        pointHoverRadius: 5,
                        pointBackgroundColor: '#fbbf24',
                        borderWidth: 2,
                        borderDash: [5, 5],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' },
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, usePointStyle: true, pointStyle: 'circle' },
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.92)',
                        titleColor: '#e2e8f0',
                        bodyColor: '#94a3b8',
                        borderColor: 'rgba(100, 220, 255, 0.12)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        padding: 12,
                        titleFont: { family: 'Inter', weight: '600' },
                        bodyFont: { family: 'Inter' },
                    },
                },
                scales: {
                    x: {
                        ticks: { color: '#475569', font: { family: 'Inter', size: 10 }, maxRotation: 0 },
                        grid: { color: 'rgba(255,255,255,0.02)' },
                    },
                    y: {
                        min: 0, max: 100,
                        ticks: { color: '#475569', font: { family: 'Inter', size: 10 }, stepSize: 25 },
                        grid: { color: 'rgba(255,255,255,0.03)' },
                    },
                },
            },
        });
    }

    function createGradient(ctx, color) {
        var canvas = ctx.getContext ? ctx : ctx.canvas || ctx;
        var context = canvas.getContext ? canvas.getContext('2d') : null;
        if (!context) return 'transparent';
        var g = context.createLinearGradient(0, 0, 0, 260);
        g.addColorStop(0, color.replace(')', ', 0.15)').replace('rgb', 'rgba'));
        g.addColorStop(1, 'rgba(0,0,0,0)');
        return g;
    }

    /* ── Lifestyle Doughnut Chart ──────────────────────────── */
    function renderDoughnutChart() {
        var ctx = document.getElementById('dash-doughnut-chart');
        if (!ctx || typeof Chart === 'undefined') return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: DATA.lifestyleLabels,
                datasets: [{
                    data: DATA.lifestyleValues,
                    backgroundColor: DATA.lifestyleColors,
                    borderColor: 'rgba(4, 7, 13, 0.8)',
                    borderWidth: 3,
                    hoverOffset: 6,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#94a3b8',
                            font: { family: 'Inter', size: 11 },
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 16,
                        },
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.92)',
                        titleColor: '#e2e8f0',
                        bodyColor: '#94a3b8',
                        borderColor: 'rgba(100, 220, 255, 0.12)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        padding: 12,
                    },
                },
            },
        });
    }

    /* ── Animate Lifestyle Bars ────────────────────────────── */
    function animateLifestyleBars() {
        var container = document.getElementById('lifestyle-list');
        if (!container) return;

        DATA.lifestyle.forEach(function (item, i) {
            var bar = container.querySelectorAll('.lifestyle-item__bar-fill')[i];
            if (bar) {
                setTimeout(function () {
                    bar.style.width = item.pct + '%';
                }, 200 + i * 120);
            }
        });
    }

    /* ── Populate History ──────────────────────────────────── */
    function populateHistory() {
        var list = document.getElementById('history-list');
        if (!list) return;

        list.innerHTML = DATA.history.map(function (h) {
            return '<div class="history-item">' +
                '<div class="history-item__dot history-item__dot--' + h.type + '"></div>' +
                '<div class="history-item__info">' +
                '<div class="history-item__scenario">' + h.scenario + '</div>' +
                '<div class="history-item__date">' + h.date + '</div>' +
                '</div>' +
                '<div class="history-item__score gradient-text" style="font-size:var(--font-size-base);">' + h.score + '</div>' +
                '</div>';
        }).join('');
    }

    /* ── Period Toggle ─────────────────────────────────────── */
    function initPeriodToggle() {
        document.querySelectorAll('.period-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.period-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                // In production, re-fetch data for the selected period
            });
        });
    }

    /* ── Bootstrap ─────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        animateQuickStats();
        renderTrendChart();
        renderDoughnutChart();
        animateLifestyleBars();
        populateHistory();
        initPeriodToggle();
    });
})();
