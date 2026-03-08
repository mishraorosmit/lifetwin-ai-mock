/* ============================================================
   LIFETWIN — pages/auth.js
   ============================================================
   RESPONSIBILITY:
   • Password visibility toggle (eye icon)
   • Password strength meter (weak/medium/strong)
   • Confirm-password match validation
   • Inline form validation on register submit
   • Loaded on register and login pages
   ============================================================ */

(function () {
    'use strict';

    /* ── Password Visibility Toggle ───────────────────────── */
    function initPasswordToggles() {
        document.querySelectorAll('.input-icon-wrap__toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var input = this.closest('.input-icon-wrap').querySelector('input');
                if (!input) return;
                var isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                var icon = this.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
                    if (window.lucide) lucide.createIcons();
                }
            });
        });
    }

    /* ── Password Strength Meter ──────────────────────────── */
    function initPasswordStrength() {
        var input = document.getElementById('reg-password');
        var bars = document.querySelectorAll('.password-strength__bar');
        var label = document.querySelector('.password-strength__label');
        if (!input || !bars.length) return;

        input.addEventListener('input', function () {
            var val = this.value, score = 0;

            if (val.length >= 6) score++;
            if (val.length >= 10) score++;
            if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
            if (/\d/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            var level = score >= 4 ? 'strong' : score >= 2 ? 'medium' : score >= 1 ? 'weak' : 'none';

            var messages = {
                none: '', weak: 'Weak — add uppercase, numbers, or symbols',
                medium: 'Medium — almost there', strong: 'Strong — looking good!',
            };
            if (label) label.textContent = messages[level];

            bars.forEach(function (bar, i) {
                bar.className = 'password-strength__bar';
                if (level === 'weak' && i < 1) bar.classList.add('active-weak');
                if (level === 'medium' && i < 3) bar.classList.add('active-medium');
                if (level === 'strong' && i < 5) bar.classList.add('active-strong');
            });
        });
    }

    /* ── Confirm Password Match ───────────────────────────── */
    function initConfirmMatch() {
        var pw = document.getElementById('reg-password');
        var confirm = document.getElementById('reg-confirm');
        var error = document.getElementById('confirm-error');
        if (!pw || !confirm) return;

        confirm.addEventListener('input', function () {
            if (this.value && this.value !== pw.value) {
                this.classList.add('error'); this.classList.remove('success');
                if (error) error.classList.add('show');
            } else if (this.value) {
                this.classList.remove('error'); this.classList.add('success');
                if (error) error.classList.remove('show');
            } else {
                this.classList.remove('error', 'success');
                if (error) error.classList.remove('show');
            }
        });
    }

    /* ── Inline Validation ────────────────────────────────── */
    function initValidation() {
        var form = document.getElementById('register-form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            var valid = true;
            var username = document.getElementById('reg-username');
            var email = document.getElementById('reg-email');
            var pw = document.getElementById('reg-password');
            var confirm = document.getElementById('reg-confirm');
            var terms = document.getElementById('reg-terms');

            if (username && username.value.trim().length < 3) { username.classList.add('error'); valid = false; }
            else if (username) username.classList.remove('error');

            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.classList.add('error'); valid = false; }
            else if (email) email.classList.remove('error');

            if (pw && pw.value.length < 6) { pw.classList.add('error'); valid = false; }
            else if (pw) pw.classList.remove('error');

            if (confirm && confirm.value !== pw.value) { confirm.classList.add('error'); valid = false; }
            else if (confirm) confirm.classList.remove('error');

            if (terms && !terms.checked) valid = false;

            if (!valid) e.preventDefault();
        });
    }

    /* ── Init ─────────────────────────────────────────────── */
    function initPage() {
        initPasswordToggles();
        initPasswordStrength();
        initConfirmMatch();
        initValidation();
        console.log('[LifeTwin] pages/auth.js initialized');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initPage();
    });
})();
