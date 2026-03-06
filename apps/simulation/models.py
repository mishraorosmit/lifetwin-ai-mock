from django.db import models
from apps.twin.models import DigitalTwin


class SimulationScenario(models.Model):

    twin = models.ForeignKey(DigitalTwin, on_delete=models.CASCADE)

    decision_type = models.CharField(max_length=100)

    variable_changed = models.CharField(max_length=100)
    old_value = models.FloatField()
    new_value = models.FloatField()

    predicted_health = models.FloatField()
    predicted_stress = models.FloatField()
    predicted_income = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)