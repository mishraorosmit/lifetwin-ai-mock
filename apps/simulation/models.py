from django.db import models
from apps.twin.models import DigitalTwin


class SimulationScenario(models.Model):
    """
    A saved simulation run — records the input parameters and
    the four AI-predicted outcome scores.
    """

    SCENARIO_CHOICES = [
        ('sleep', 'Sleep Optimization'),
        ('fitness', 'Fitness Boost'),
        ('stress', 'Stress Reduction'),
        ('custom', 'Custom Simulation'),
    ]

    twin = models.ForeignKey(DigitalTwin, on_delete=models.CASCADE, related_name='simulations')

    # ── Scenario Metadata ────────────────────────────────────
    scenario_name = models.CharField(max_length=20, choices=SCENARIO_CHOICES, default='custom')

    # ── Input Parameters ─────────────────────────────────────
    sleep_hours = models.FloatField()
    exercise_days = models.IntegerField()
    water_intake = models.IntegerField()
    stress_level = models.FloatField()
    screen_time = models.FloatField()

    # ── AI-Predicted Outcomes (all 0–100 except stress which is 0–10) ──
    predicted_health = models.FloatField(help_text='0–100')
    predicted_stress = models.FloatField(help_text='0–10')
    predicted_energy = models.FloatField(help_text='0–100')
    predicted_longevity = models.FloatField(help_text='0–100')

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.twin.user.username} — {self.get_scenario_name_display()} ({self.created_at:%Y-%m-%d})"

    @property
    def overall_score(self):
        """Weighted composite score used by the result page."""
        return round(
            self.predicted_health * 0.40
            + (100 - self.predicted_stress * 10) * 0.25
            + self.predicted_energy * 0.20
            + self.predicted_longevity * 0.15
        )