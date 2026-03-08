/* ============================================================
   LIFETWIN — api/api-client.js
   ============================================================
   Reusable API communication layer for all frontend scripts.

   RESPONSIBILITIES:
   ✦ Centralized fetch() wrapper with CSRF token injection
   ✦ Automatic JSON parsing and error handling
   ✦ Network error recovery with user-friendly messages
   ✦ Loading-state toggle helper for buttons
   ✦ Domain-specific API functions:
       — getDashboardStats()
       — getHealthTrend(period)
       — runSimulation(data)
       — getSimulationHistory()

   USAGE FROM OTHER SCRIPTS:
   ──────────────────────────────────────────────────────────
   Since this is a vanilla JS project loaded via <script> tags
   (not ES modules), all functions are exposed on the global
   window.LifeTwin.api namespace.

   Any page script can call them directly:

     // Example: pages/dashboard.js
     document.addEventListener('DOMContentLoaded', async function () {
         try {
             var stats = await LifeTwin.api.getDashboardStats();
             renderStats(stats);
         } catch (err) {
             showError('Could not load dashboard stats.');
         }
     });

     // Example: pages/simulation.js
     var btn = document.getElementById('sim-run-btn');
     btn.addEventListener('click', async function () {
         LifeTwin.api.setLoading(btn, true, 'Running…');
         try {
             var result = await LifeTwin.api.runSimulation(formData);
             // redirect or render result
         } catch (err) {
             alert(err.message);
         } finally {
             LifeTwin.api.setLoading(btn, false);
         }
     });

   The api-client.js script must be loaded AFTER core/app.js
   in base.html so that LifeTwin.getCsrfToken() is available.
   ============================================================ */

(function () {
    'use strict';

    window.LifeTwin = window.LifeTwin || {};

    /* ══════════════════════════════════════════════════════════
       1.  CSRF TOKEN
       ══════════════════════════════════════════════════════════ */
    function getCsrfToken() {
        // Prefer the helper already set by core/app.js
        if (window.LifeTwin.getCsrfToken) {
            return window.LifeTwin.getCsrfToken();
        }
        var cookie = document.cookie
            .split('; ')
            .find(function (row) { return row.startsWith('csrftoken='); });
        return cookie ? cookie.split('=')[1] : '';
    }

    /* ══════════════════════════════════════════════════════════
       2.  CORE REQUEST HANDLER
       ──────────────────────────────────────────────────────────
       Low-level fetch wrapper used by all convenience methods.
       • Injects CSRF token header on every request
       • Sets 'same-origin' credentials for session cookies
       • Parses JSON automatically (falls back to text)
       • Wraps all errors with a clear message
       ══════════════════════════════════════════════════════════ */
    async function request(url, options) {
        options = options || {};

        var headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCsrfToken(),
            'X-Requested-With': 'XMLHttpRequest',
        };

        // Merge any custom headers
        if (options.headers) {
            Object.keys(options.headers).forEach(function (key) {
                headers[key] = options.headers[key];
            });
        }

        var config = {
            method: options.method || 'GET',
            headers: headers,
            credentials: 'same-origin',
        };

        // Attach body for POST/PUT/PATCH
        if (options.body) {
            config.body = typeof options.body === 'string'
                ? options.body
                : JSON.stringify(options.body);
        }

        try {
            var response = await fetch(url, config);

            if (!response.ok) {
                var errorBody = '';
                try { errorBody = await response.text(); } catch (_) { /* ignore */ }
                throw new Error(
                    'API Error ' + response.status + ': ' +
                    (response.statusText || 'Unknown') +
                    (errorBody ? ' — ' + errorBody.substring(0, 200) : '')
                );
            }

            // Parse based on content-type
            var contentType = response.headers.get('content-type') || '';
            if (contentType.indexOf('application/json') !== -1) {
                return await response.json();
            }
            return await response.text();

        } catch (error) {
            // Network failure (offline, DNS, CORS, timeout, etc.)
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                console.error('[LifeTwin API] Network error — check your connection.');
                throw new Error('Network error: unable to reach the server. Please check your connection.');
            }
            console.error('[LifeTwin API]', error.message || error);
            throw error;
        }
    }

    /* ══════════════════════════════════════════════════════════
       3.  HTTP CONVENIENCE METHODS
       ══════════════════════════════════════════════════════════ */
    async function get(url) { return request(url, { method: 'GET' }); }
    async function post(url, data) { return request(url, { method: 'POST', body: data }); }
    async function put(url, data) { return request(url, { method: 'PUT', body: data }); }
    async function patch(url, data) { return request(url, { method: 'PATCH', body: data }); }
    async function del(url) { return request(url, { method: 'DELETE' }); }

    /* ══════════════════════════════════════════════════════════
       4.  LOADING STATE HELPER
       ──────────────────────────────────────────────────────────
       Toggle a visual loading state on a <button> or element.
       Saves the original innerHTML, replaces it with a spinner
       message, and disables the element.

       @param {HTMLElement} el         — target button/element
       @param {boolean}     isLoading  — true to show, false to restore
       @param {string}      message    — loading text (default 'Loading...')
       ══════════════════════════════════════════════════════════ */
    function setLoading(el, isLoading, message) {
        if (!el) return;
        message = message || 'Loading...';

        if (isLoading) {
            el.setAttribute('data-original-html', el.innerHTML);
            el.innerHTML = '<span class="loading-spinner"></span> ' + message;
            el.disabled = true;
            el.classList.add('loading');
        } else {
            var original = el.getAttribute('data-original-html');
            if (original !== null) el.innerHTML = original;
            el.disabled = false;
            el.classList.remove('loading');
            el.removeAttribute('data-original-html');
        }
    }

    /* ══════════════════════════════════════════════════════════
       5.  DOMAIN-SPECIFIC API FUNCTIONS
       ──────────────────────────────────────────────────────────
       High-level functions that page scripts call.
       Each wraps a specific backend endpoint.
       ══════════════════════════════════════════════════════════ */

    /**
     * Fetch quick-stats for the dashboard (health score, stress,
     * total simulations, twin age).
     *
     * @returns {Promise<Object>} Dashboard stats object
     *
     * Usage:
     *   var stats = await LifeTwin.api.getDashboardStats();
     *   document.getElementById('qs-health').textContent = stats.healthScore + '%';
     */
    async function getDashboardStats() {
        return get('/api/dashboard/stats/');
    }

    /**
     * Fetch health trend data for a given time period.
     *
     * @param {string} period — '7d', '30d', or '90d' (default '30d')
     * @returns {Promise<Object>} { labels: [...], health: [...], stress: [...], energy: [...] }
     *
     * Usage:
     *   var trend = await LifeTwin.api.getHealthTrend('30d');
     *   renderTrendChart(trend.labels, trend.health);
     */
    async function getHealthTrend(period) {
        period = period || '30d';
        return get('/api/dashboard/health-trend/?period=' + encodeURIComponent(period));
    }

    /**
     * Submit simulation parameters and receive prediction results.
     *
     * @param {Object} data — Simulation parameters
     *   { scenario: 'sleep', params: { sleep_hours: 7, exercise: 5 } }
     * @returns {Promise<Object>} Simulation result with scores, charts, comparison
     *
     * Usage:
     *   var result = await LifeTwin.api.runSimulation({
     *       scenario: 'sleep',
     *       params: { sleep_hours: 7, exercise_days: 5, stress: 3 }
     *   });
     *   renderResult(result);
     */
    async function runSimulation(data) {
        return post('/api/simulation/run/', data);
    }

    /**
     * Fetch the user's simulation history.
     *
     * @returns {Promise<Array>} Array of past simulation entries
     *   [{ id, scenario, date, score, type }, ...]
     *
     * Usage:
     *   var history = await LifeTwin.api.getSimulationHistory();
     *   history.forEach(function (entry) { appendHistoryRow(entry); });
     */
    async function getSimulationHistory() {
        return get('/api/simulation/history/');
    }

    /* ══════════════════════════════════════════════════════════
       6.  EXPOSE ON NAMESPACE
       ──────────────────────────────────────────────────────────
       All functions are available as window.LifeTwin.api.*
       so any page script can call them directly.
       ══════════════════════════════════════════════════════════ */
    window.LifeTwin.api = {
        /* Low-level transport */
        request: request,
        get: get,
        post: post,
        put: put,
        patch: patch,
        delete: del,

        /* UI helper */
        setLoading: setLoading,

        /* Domain-specific endpoints */
        getDashboardStats: getDashboardStats,
        getHealthTrend: getHealthTrend,
        runSimulation: runSimulation,
        getSimulationHistory: getSimulationHistory,
    };

    /* ══════════════════════════════════════════════════════════
       7.  BOOTSTRAP
       ══════════════════════════════════════════════════════════ */
    function initPage() {
        console.log('[LifeTwin] api/api-client.js initialized');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initPage();
    });
})();
