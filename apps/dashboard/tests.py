"""
apps/dashboard/tests.py
───────────────────────
Test suite for the four LifeTwin dashboard API endpoints:

  /api/dashboard/stats/
  /api/dashboard/health-trend/
  /api/dashboard/lifestyle-breakdown/
  /api/simulation/history/

Each API view must:
  1. Redirect anonymous users to the login page (302).
  2. Return safe defaults (zeros / empty lists) for users without a twin.
  3. Return real database-driven data for fully-onboarded users.
"""

import json

from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse

from apps.twin.models import DigitalTwin
from apps.simulation.models import SimulationScenario


# ─── Helper ──────────────────────────────────────────────────────────────────


def _create_user(username='testuser', password='testpass123'):
    """Create and return a fresh Django User."""
    return User.objects.create_user(username=username, password=password)


def _create_twin(user, **kwargs):
    """Create a DigitalTwin with sensible defaults for any user."""
    defaults = dict(
        age=25,
        gender='male',
        height=175.0,
        weight=70.0,
        sleep_hours=7.0,
        exercise_days=3,
        water_intake=6,
        stress_level=5.0,
        screen_time=4.0,
        diet='balanced',
    )
    defaults.update(kwargs)
    return DigitalTwin.objects.create(user=user, **defaults)


def _create_simulation(twin, **kwargs):
    """Create a SimulationScenario tied to the given twin."""
    defaults = dict(
        scenario_name='custom',
        sleep_hours=7.0,
        exercise_days=3,
        water_intake=6,
        stress_level=5.0,
        screen_time=4.0,
        predicted_health=72.5,
        predicted_stress=4.2,
        predicted_energy=65.0,
        predicted_longevity=78.0,
    )
    defaults.update(kwargs)
    return SimulationScenario.objects.create(twin=twin, **defaults)


# ─── Auth Guard Tests ─────────────────────────────────────────────────────────


class APIAuthGuardTests(TestCase):
    """Anonymous requests to every API endpoint must redirect to login."""

    ENDPOINTS = [
        'api_dashboard_stats',
        'api_health_trend',
        'api_lifestyle_breakdown',
        'api_simulation_history',
    ]

    def setUp(self):
        self.client = Client()

    def test_anonymous_redirected_to_login(self):
        for name in self.ENDPOINTS:
            url = reverse(name)
            response = self.client.get(url)
            self.assertEqual(
                response.status_code, 302,
                msg=f'Expected 302 for anonymous request to {name}, got {response.status_code}'
            )
            self.assertIn('/login/', response['Location'],
                          msg=f'{name} should redirect to the login page')


# ─── Stats API ────────────────────────────────────────────────────────────────


class DashboardStatsAPITests(TestCase):
    """Tests for GET /api/dashboard/stats/"""

    def setUp(self):
        self.client = Client()
        self.user = _create_user()
        self.client.force_login(self.user)
        self.url = reverse('api_dashboard_stats')

    def test_no_twin_returns_safe_defaults(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertFalse(data['has_twin'])
        self.assertEqual(data['health_score'], 0)
        self.assertEqual(data['total_simulations'], 0)

    def test_twin_no_simulation_returns_zeros(self):
        _create_twin(self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertTrue(data['has_twin'])
        self.assertEqual(data['total_simulations'], 0)
        self.assertEqual(data['health_score'], 0)

    def test_twin_with_simulation_returns_real_data(self):
        twin = _create_twin(self.user)
        sim = _create_simulation(twin, predicted_health=80.0, predicted_stress=3.5)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertTrue(data['has_twin'])
        self.assertEqual(data['total_simulations'], 1)
        self.assertEqual(data['health_score'], 80.0)
        self.assertEqual(data['stress_level'], 3.5)
        # overall_score is a computed property — just ensure it's a number
        self.assertIsInstance(data['overall_score'], (int, float))

    def test_content_type_is_json(self):
        response = self.client.get(self.url)
        self.assertEqual(response['Content-Type'], 'application/json')


# ─── Health Trend API ─────────────────────────────────────────────────────────


class HealthTrendAPITests(TestCase):
    """Tests for GET /api/dashboard/health-trend/"""

    def setUp(self):
        self.client = Client()
        self.user = _create_user()
        self.client.force_login(self.user)
        self.url = reverse('api_health_trend')

    def test_no_twin_returns_empty_arrays(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['labels'], [])
        self.assertEqual(data['health'], [])
        self.assertEqual(data['energy'], [])
        self.assertEqual(data['stress'], [])

    def test_twin_no_simulations_returns_empty_arrays(self):
        _create_twin(self.user)
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertEqual(data['labels'], [])

    def test_trend_data_matches_simulations(self):
        twin = _create_twin(self.user)
        _create_simulation(twin, predicted_health=70.0, predicted_energy=60.0, predicted_stress=5.0)
        _create_simulation(twin, predicted_health=78.0, predicted_energy=68.0, predicted_stress=4.2)
        response = self.client.get(self.url)
        data = json.loads(response.content)
        # Two simulations created → two data points returned (oldest-first)
        self.assertEqual(len(data['labels']), 2)
        self.assertEqual(len(data['health']), 2)
        self.assertIn(70.0, data['health'])
        self.assertIn(78.0, data['health'])

    def test_capped_at_10_data_points(self):
        twin = _create_twin(self.user)
        for i in range(12):
            _create_simulation(twin, predicted_health=50.0 + i)
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertLessEqual(len(data['labels']), 10)


# ─── Lifestyle Breakdown API ──────────────────────────────────────────────────


class LifestyleBreakdownAPITests(TestCase):
    """Tests for GET /api/dashboard/lifestyle-breakdown/"""

    def setUp(self):
        self.client = Client()
        self.user = _create_user()
        self.client.force_login(self.user)
        self.url = reverse('api_lifestyle_breakdown')

    def test_no_twin_returns_has_twin_false(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertFalse(data['has_twin'])

    def test_twin_data_values_are_correct(self):
        _create_twin(self.user, sleep_hours=9.0, exercise_days=7, water_intake=12)
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertTrue(data['has_twin'])
        self.assertEqual(data['sleep_hours'], 9.0)
        self.assertEqual(data['exercise_days'], 7)
        self.assertEqual(data['water_intake'], 12)
        # Optimal sleep (9h) should yield 100%
        self.assertEqual(data['sleep_pct'], 100)
        # Optimal exercise (7d) should yield 100%
        self.assertEqual(data['exercise_pct'], 100)

    def test_percentage_scores_are_bounded_0_to_100(self):
        _create_twin(self.user, sleep_hours=3.0, stress_level=10.0, screen_time=16.0)
        response = self.client.get(self.url)
        data = json.loads(response.content)
        for key in ('sleep_pct', 'exercise_pct', 'water_pct', 'stress_pct', 'screen_pct'):
            self.assertGreaterEqual(data[key], 0, msg=f'{key} < 0')
            self.assertLessEqual(data[key], 100, msg=f'{key} > 100')

    def test_diet_field_is_returned(self):
        _create_twin(self.user, diet='vegan')
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertEqual(data['diet'], 'vegan')


# ─── Simulation History API ───────────────────────────────────────────────────


class SimulationHistoryAPITests(TestCase):
    """Tests for GET /api/simulation/history/"""

    def setUp(self):
        self.client = Client()
        self.user = _create_user()
        self.client.force_login(self.user)
        self.url = reverse('api_simulation_history')

    def test_no_twin_returns_empty_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['count'], 0)
        self.assertEqual(data['simulations'], [])

    def test_twin_no_simulations_returns_empty_list(self):
        _create_twin(self.user)
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertEqual(data['count'], 0)

    def test_returns_correct_simulation_fields(self):
        twin = _create_twin(self.user)
        _create_simulation(twin, scenario_name='sleep', predicted_health=85.0)
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertEqual(data['count'], 1)
        sim = data['simulations'][0]
        # Required fields must all be present
        for field in ('id', 'scenario_name', 'scenario_display', 'overall_score',
                      'predicted_health', 'predicted_stress', 'predicted_energy',
                      'predicted_longevity', 'created_at'):
            self.assertIn(field, sim, msg=f'Missing field: {field}')
        self.assertEqual(sim['scenario_name'], 'sleep')
        self.assertEqual(sim['scenario_display'], 'Sleep Optimization')
        self.assertEqual(sim['predicted_health'], 85.0)

    def test_capped_at_20_results(self):
        twin = _create_twin(self.user)
        for _ in range(25):
            _create_simulation(twin)
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertLessEqual(len(data['simulations']), 20)

    def test_only_own_data_returned(self):
        """A second user's simulations must never appear in the first user's response."""
        twin = _create_twin(self.user)
        _create_simulation(twin, predicted_health=90.0)

        other_user = _create_user(username='otheruser')
        other_twin = _create_twin(other_user)
        _create_simulation(other_twin, predicted_health=55.0)

        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertEqual(data['count'], 1)
        self.assertEqual(data['simulations'][0]['predicted_health'], 90.0)
