/* ============================================================
   LIFETWIN — Simulation Result JavaScript
   ============================================================
   Uses Chart.js for visualizations.
   All data is mock — in production, replace with API calls.
   ============================================================ */

(function () {
    'use strict';

    /* ── Mock Result Data ──────────────────────────────────── */
    var MOCK = {
        overallScore: 82,
        health: { value: 87, change: +23, direction: 'up' },
        stress: { value: 32, change: -34, direction: 'down' },
        energy: { value: 76, change: +41, direction: 'up' },
        longevity: { value: 89, change: +12, direction: 'up' },
        comparison: [
            { param: 'Sleep Hours', before: '5h', after: '7h', change: '+2h', positive: true },
            { param: 'Exercise', before: '2x/wk', after: '5x/wk', change: '+3x', positive: true },
            { param: 'Stress Level', before: '7/10', after: '3/10', change: '-4 pts', positive: true },
            { param: 'Screen Time', before: '8h', after: '4h', change: '-4h', positive: true },
            { param: 'Water Intake', before: '4 gl', after: '8 gl', change: '+4 glasses', positive: true },
        ],
        trendLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 6', 'Week 8', 'Week 12'],
        healthTrend: [64, 68, 72, 76, 80, 84, 87],
        stressTrend: [66, 58, 50, 44, 38, 34, 32],
        radarLabels: ['Sleep', 'Exercise', 'Nutrition', 'Stress', 'Energy', 'Hydration'],
        radarBefore: [40, 30, 55, 30, 45, 35],
        radarAfter: [80, 75, 65, 75, 80, 85],
    };

    /* ── Animate Score Ring ────────────────────────────────── */
    function animateScoreRing() {
        var ring = document.querySelector('.score-hero__ring-fill');
        var numberEl = document.getElementById('score-number');
        if (!ring || !numberEl) return;

        var circumference = 502; // 2 * π * 80
        var target = MOCK.overallScore;
        var offset = circumference - (circumference * target / 100);

        // Trigger after a short delay for visual effect
        setTimeout(function () {
            ring.style.strokeDashoffset = offset;
        }, 300);

        // Animate number
        var start = performance.now();
        var duration = 1600;
        function tick(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            numberEl.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
        }
        setTimeout(function () { requestAnimationFrame(tick); }, 300);
    }

    /* ── Animate Metric Cards ──────────────────────────────── */
    function animateMetrics() {
        var metrics = {
            'metric-health': MOCK.health,
            'metric-stress': MOCK.stress,
            'metric-energy': MOCK.energy,
            'metric-longevity': MOCK.longevity,
        };

        Object.keys(metrics).forEach(function (id) {
            var el = document.getElementById(id);
            if (!el) return;
            var data = metrics[id];
            var valueEl = el.querySelector('.metric-card__value');
            var changeEl = el.querySelector('.metric-card__change');
            if (!valueEl) return;

            // Animate value
            var target = data.value;
            var start = performance.now();
            function tick(now) {
                var elapsed = now - start;
                var progress = Math.min(elapsed / 1200, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                valueEl.textContent = Math.round(target * eased) + (id === 'metric-stress' ? '/10' : '%');
                if (progress < 1) requestAnimationFrame(tick);
            }
            setTimeout(function () { requestAnimationFrame(tick); }, 500);

            // Set change text
            if (changeEl) {
                var prefix = data.change > 0 ? '+' : '';
                changeEl.querySelector('span').textContent = prefix + data.change + '%';
            }
        });
    }

    /* ── Health Trend Line Chart ───────────────────────────── */
    function renderHealthTrendChart() {
        var ctx = document.getElementById('chart-health-trend');
        if (!ctx || typeof Chart === 'undefined') return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: MOCK.trendLabels,
                datasets: [
                    {
                        label: 'Health Score',
                        data: MOCK.healthTrend,
                        borderColor: '#34d399',
                        backgroundColor: 'rgba(52, 211, 153, 0.08)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#34d399',
                        pointBorderColor: '#34d399',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                    },
                    {
                        label: 'Stress Level',
                        data: MOCK.stressTrend,
                        borderColor: '#06d6f2',
                        backgroundColor: 'rgba(6, 214, 242, 0.05)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#06d6f2',
                        pointBorderColor: '#06d6f2',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                    },
                ],
            },
            options: chartOptions('Health & Stress Over Time'),
        });
    }

    /* ── Radar Chart ───────────────────────────────────────── */
    function renderRadarChart() {
        var ctx = document.getElementById('chart-radar');
        if (!ctx || typeof Chart === 'undefined') return;

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: MOCK.radarLabels,
                datasets: [
                    {
                        label: 'Before',
                        data: MOCK.radarBefore,
                        borderColor: 'rgba(148, 163, 184, 0.6)',
                        backgroundColor: 'rgba(148, 163, 184, 0.06)',
                        pointBackgroundColor: '#94a3b8',
                        pointRadius: 3,
                    },
                    {
                        label: 'After',
                        data: MOCK.radarAfter,
                        borderColor: '#06d6f2',
                        backgroundColor: 'rgba(6, 214, 242, 0.10)',
                        pointBackgroundColor: '#06d6f2',
                        pointRadius: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } },
                    },
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 25,
                            color: '#475569',
                            backdropColor: 'transparent',
                            font: { size: 10 },
                        },
                        grid: { color: 'rgba(255,255,255,0.04)' },
                        angleLines: { color: 'rgba(255,255,255,0.04)' },
                        pointLabels: {
                            color: '#94a3b8',
                            font: { family: 'Inter', size: 11 },
                        },
                    },
                },
            },
        });
    }

    /* ── Shared Chart Options ──────────────────────────────── */
    function chartOptions(title) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { intersect: false, mode: 'index' },
            plugins: {
                legend: {
                    labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } },
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
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
                    ticks: { color: '#475569', font: { family: 'Inter', size: 11 } },
                    grid: { color: 'rgba(255,255,255,0.03)' },
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { color: '#475569', font: { family: 'Inter', size: 11 }, stepSize: 25 },
                    grid: { color: 'rgba(255,255,255,0.03)' },
                },
            },
        };
    }

    /* ── Populate Comparison Table ──────────────────────────── */
    function populateComparisonTable() {
        var tbody = document.getElementById('comparison-tbody');
        if (!tbody) return;

        tbody.innerHTML = MOCK.comparison.map(function (row) {
            var changeClass = row.positive ? 'color: var(--color-success)' : 'color: var(--color-danger)';
            var arrow = row.positive ? '↑' : '↓';
            return '<tr>' +
                '<td>' + row.param + '</td>' +
                '<td class="val-before">' + row.before + '</td>' +
                '<td class="val-after">' + row.after + '</td>' +
                '<td class="val-change" style="' + changeClass + '">' + arrow + ' ' + row.change + '</td>' +
                '</tr>';
        }).join('');
    }

    /* ── Bootstrap ─────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        animateScoreRing();
        animateMetrics();
        renderHealthTrendChart();
        renderRadarChart();
        populateComparisonTable();
    });
})();
