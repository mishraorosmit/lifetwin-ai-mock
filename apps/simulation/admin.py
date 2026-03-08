from django.contrib import admin
from .models import SimulationScenario


@admin.register(SimulationScenario)
class SimulationScenarioAdmin(admin.ModelAdmin):
    list_display = [
        'twin', 'scenario_name', 'predicted_health',
        'predicted_stress', 'predicted_energy', 'predicted_longevity', 'created_at',
    ]
    list_filter = ['scenario_name', 'created_at']
    readonly_fields = ['created_at']