/* ============================================================
   LIFETWIN — pages/dashboard.js
   ============================================================
   RESPONSIBILITY:
   • Quick-stat number animations (health, stress, sims)
   • Chart.js health/energy trend line chart
   • Chart.js lifestyle doughnut chart
   • Lifestyle parameter bar-fill animations
   • Simulation history list population
   • Period toggle button interaction (7D/30D/90D)
   • Loaded on the dashboard page (/dashboard/)
   • Uses mock data — will be replaced with API calls later
   ============================================================ */

(function () {
    'use strict';

    /* ── Mock Data (placeholder until API integration) ────── */
    var DATA = {
        healthScore: 82, stressLevel: 3.2, totalSims: 24,
        trendLabels: ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Feb 1', 'Feb 5', 'Feb 10', 'Feb 15', 'Feb 20', 'Feb 25', 'Mar 1'],
        healthData: [58, 61, 60, 65, 68, 71, 72, 74, 76, 78, 79, 81, 82],
        energyData: [42, 45, 44, 50, 53, 58, 60, 63, 66, 70, 72, 74, 76],
        lifestyleLabels: ['Sleep', 'Exercise', 'Nutrition', 'Hydration', 'Mental Health'],
        lifestyleValues: [78, 72, 65, 85, 60],
        lifestyleColors: ['#06d6f2', '#818cf8', '#34d399', '#fbbf24', '#f87171'],
        lifestyle: [
            { name: 'Sleep Quality', pct: 72 }, { name: 'Exercise', pct: 71 },
            { name: 'Hydration', pct: 85 }, { name: 'Screen Time', pct: 56 },
            { name: 'Stress Mgmt', pct: 60 },
        ],
        history: [
            { scenario: 'Sleep Optimization', date: '2 hours ago', score: 82, type: 'success' },
            { scenario: 'Fitness Boost', date: 'Yesterday', score: 76, type: 'accent' },
            { scenario: 'Stress Reduction', date: '3 days ago', score: 71, type: 'warning' },
            { scenario: 'Custom Simulation', date: '1 week ago', score: 68, type: 'accent' },
            { scenario: 'Sleep + Exercise', date: '2 weeks ago', score: 74, type: 'success' },
        ],
    };

    /* ── Quick Stats ──────────────────────────────────────── */
    function initQuickStats() {
        var anim = window.LifeTwin && window.LifeTwin.animate;
        if (!anim) return;

        var h = document.getElementById('qs-health');
        var s = document.getElementById('qs-stress');
        var n = document.getElementById('qs-sims');

        if (h) anim.counter(h, DATA.healthScore, '%', 1400, false);
        if (s) anim.counter(s, DATA.stressLevel, '/10', 1400, true);
        if (n) anim.counter(n, DATA.totalSims, '', 1400, false);
    }

    /* ── Chart.js — Trend Line ────────────────────────────── */
    function initTrendChart() {
        var ctx = document.getElementById('dash-trend-chart');
        if (!ctx || typeof Chart === 'undefined') return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: DATA.trendLabels,
                datasets: [
                    { label: 'Health Score', data: DATA.healthData, borderColor: '#34d399', fill: true, backgroundColor: 'rgba(52,211,153,0.08)', tension: 0.4, pointRadius: 3, borderWidth: 2 },
                    { label: 'Energy Level', data: DATA.energyData, borderColor: '#fbbf24', fill: false, tension: 0.4, pointRadius: 2, borderWidth: 2, borderDash: [5, 5] },
                ],
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' },
                plugins: {
                    legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, usePointStyle: true } },
                    tooltip: { backgroundColor: 'rgba(15,23,42,0.92)', titleColor: '#e2e8f0', bodyColor: '#94a3b8', cornerRadius: 8, padding: 12 },
                },
                scales: {
                    x: { ticks: { color: '#475569', font: { size: 10 }, maxRotation: 0 }, grid: { color: 'rgba(255,255,255,0.02)' } },
                    y: { min: 0, max: 100, ticks: { color: '#475569', stepSize: 25 }, grid: { color: 'rgba(255,255,255,0.03)' } },
                },
            },
        });
    }

    /* ── Chart.js — Doughnut ──────────────────────────────── */
    function initDoughnutChart() {
        var ctx = document.getElementById('dash-doughnut-chart');
        if (!ctx || typeof Chart === 'undefined') return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: DATA.lifestyleLabels,
                datasets: [{ data: DATA.lifestyleValues, backgroundColor: DATA.lifestyleColors, borderColor: 'rgba(4,7,13,0.8)', borderWidth: 3, hoverOffset: 6 }],
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '70%',
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, usePointStyle: true, padding: 16 } },
                    tooltip: { backgroundColor: 'rgba(15,23,42,0.92)', titleColor: '#e2e8f0', bodyColor: '#94a3b8', cornerRadius: 8, padding: 12 },
                },
            },
        });
    }

    /* ── Lifestyle Bars ───────────────────────────────────── */
    function initLifestyleBars() {
        var container = document.getElementById('lifestyle-list');
        if (!container) return;

        DATA.lifestyle.forEach(function (item, i) {
            var bar = container.querySelectorAll('.lifestyle-item__bar-fill')[i];
            if (bar) setTimeout(function () { bar.style.width = item.pct + '%'; }, 200 + i * 120);
        });
    }

    /* ── History List ─────────────────────────────────────── */
    function initHistory() {
        var list = document.getElementById('history-list');
        if (!list) return;

        list.innerHTML = DATA.history.map(function (h) {
            return '<div class="history-item">' +
                '<div class="history-item__dot history-item__dot--' + h.type + '"></div>' +
                '<div class="history-item__info"><div class="history-item__scenario">' + h.scenario + '</div>' +
                '<div class="history-item__date">' + h.date + '</div></div>' +
                '<div class="history-item__score gradient-text">' + h.score + '</div></div>';
        }).join('');
    }

    /* ── Period Toggle ────────────────────────────────────── */
    function initPeriodToggle() {
        document.querySelectorAll('.period-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.period-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
            });
        });
    }

    /* ── Init ─────────────────────────────────────────────── */
    function initPage() {
        initQuickStats();
        initTrendChart();
        initDoughnutChart();
        initLifestyleBars();
        initHistory();
        initPeriodToggle();
        console.log('[LifeTwin] pages/dashboard.js initialized');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initPage();
    });
})();
