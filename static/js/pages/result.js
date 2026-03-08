/* ============================================================
   LIFETWIN — pages/result.js
   ============================================================
   RESPONSIBILITY:
   • Score ring SVG stroke animation
   • Metric card value count-up animations
   • Chart.js health trend line chart
   • Chart.js radar chart (before vs after)
   • Comparison table population
   • Loaded on the simulation result page (/simulation/result/)
   • Uses mock data — will be replaced with API calls later
   ============================================================ */

(function () {
    'use strict';

    /* ── Mock Data (placeholder until API integration) ────── */
    var MOCK = {
        overallScore: 82,
        health: { value: 87, change: +23 },
        stress: { value: 32, change: -34 },
        energy: { value: 76, change: +41 },
        longevity: { value: 89, change: +12 },
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

    /* ── Score Ring Animation ─────────────────────────────── */
    function initScoreRing() {
        var ring = document.querySelector('.score-hero__ring-fill');
        var numberEl = document.getElementById('score-number');
        if (!ring || !numberEl) return;

        var circumference = 502;
        var offset = circumference - (circumference * MOCK.overallScore / 100);

        setTimeout(function () { ring.style.strokeDashoffset = offset; }, 300);

        if (window.LifeTwin && window.LifeTwin.animate) {
            setTimeout(function () {
                window.LifeTwin.animate.counter(numberEl, MOCK.overallScore, '', 1600, false);
            }, 300);
        }
    }

    /* ── Metric Card Animations ──────────────────────────── */
    function initMetrics() {
        var metrics = {
            'metric-health': MOCK.health, 'metric-stress': MOCK.stress,
            'metric-energy': MOCK.energy, 'metric-longevity': MOCK.longevity,
        };

        Object.keys(metrics).forEach(function (id) {
            var el = document.getElementById(id);
            if (!el) return;
            var data = metrics[id];
            var valueEl = el.querySelector('.metric-card__value');
            var changeEl = el.querySelector('.metric-card__change');

            if (valueEl && window.LifeTwin && window.LifeTwin.animate) {
                var suffix = id === 'metric-stress' ? '/10' : '%';
                setTimeout(function () {
                    window.LifeTwin.animate.counter(valueEl, data.value, suffix, 1200, false);
                }, 500);
            }

            if (changeEl) {
                var span = changeEl.querySelector('span');
                if (span) span.textContent = (data.change > 0 ? '+' : '') + data.change + '%';
            }
        });
    }

    /* ── Comparison Table ─────────────────────────────────── */
    function initComparisonTable() {
        var tbody = document.getElementById('comparison-tbody');
        if (!tbody) return;

        tbody.innerHTML = MOCK.comparison.map(function (row) {
            var style = row.positive ? 'color:var(--color-success)' : 'color:var(--color-danger)';
            var arrow = row.positive ? '↑' : '↓';
            return '<tr><td>' + row.param + '</td><td class="val-before">' + row.before +
                '</td><td class="val-after">' + row.after +
                '</td><td class="val-change" style="' + style + '">' + arrow + ' ' + row.change + '</td></tr>';
        }).join('');
    }

    /* ── Chart.js — Health Trend Line ─────────────────────── */
    function initTrendChart() {
        var ctx = document.getElementById('chart-health-trend');
        if (!ctx || typeof Chart === 'undefined') return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: MOCK.trendLabels,
                datasets: [
                    { label: 'Health Score', data: MOCK.healthTrend, borderColor: '#34d399', backgroundColor: 'rgba(52,211,153,0.08)', fill: true, tension: 0.4, pointRadius: 4, pointHoverRadius: 6 },
                    { label: 'Stress Level', data: MOCK.stressTrend, borderColor: '#06d6f2', backgroundColor: 'rgba(6,214,242,0.05)', fill: true, tension: 0.4, pointRadius: 4, pointHoverRadius: 6 },
                ],
            },
            options: sharedChartOptions(),
        });
    }

    /* ── Chart.js — Radar ─────────────────────────────────── */
    function initRadarChart() {
        var ctx = document.getElementById('chart-radar');
        if (!ctx || typeof Chart === 'undefined') return;

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: MOCK.radarLabels,
                datasets: [
                    { label: 'Before', data: MOCK.radarBefore, borderColor: 'rgba(148,163,184,0.6)', backgroundColor: 'rgba(148,163,184,0.06)', pointRadius: 3 },
                    { label: 'After', data: MOCK.radarAfter, borderColor: '#06d6f2', backgroundColor: 'rgba(6,214,242,0.10)', pointRadius: 4 },
                ],
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } } } },
                scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 25, color: '#475569', backdropColor: 'transparent' }, grid: { color: 'rgba(255,255,255,0.04)' }, pointLabels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } } } },
            },
        });
    }

    /* ── Shared Options ───────────────────────────────────── */
    function sharedChartOptions() {
        return {
            responsive: true, maintainAspectRatio: false,
            interaction: { intersect: false, mode: 'index' },
            plugins: {
                legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } } },
                tooltip: { backgroundColor: 'rgba(15,23,42,0.9)', titleColor: '#e2e8f0', bodyColor: '#94a3b8', borderColor: 'rgba(100,220,255,0.12)', borderWidth: 1, cornerRadius: 8, padding: 12 },
            },
            scales: {
                x: { ticks: { color: '#475569', font: { family: 'Inter', size: 11 } }, grid: { color: 'rgba(255,255,255,0.03)' } },
                y: { beginAtZero: true, max: 100, ticks: { color: '#475569', stepSize: 25 }, grid: { color: 'rgba(255,255,255,0.03)' } },
            },
        };
    }

    /* ── Init ─────────────────────────────────────────────── */
    function initPage() {
        initScoreRing();
        initMetrics();
        initComparisonTable();
        initTrendChart();
        initRadarChart();
        console.log('[LifeTwin] pages/result.js initialized');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initPage();
    });
})();
