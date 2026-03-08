"""
apps/simulation/services.py
────────────────────────────
Orchestration layer — sits between the view and the engine.

  View → services.run_simulation() → engine.compute_*() → DB save → return result
"""
from .engine import (
    compute_health_score,
    compute_stress_score,
    compute_energy_score,
    compute_longevity_score,
)
from .models import SimulationScenario


def run_simulation(user, params: dict) -> SimulationScenario:
    """
    Run the AI simulation for a given user and set of lifestyle parameters.

    Parameters
    ----------
    user   : Django User instance (must have a related DigitalTwin)
    params : dict with keys:
               scenario       — 'sleep' | 'fitness' | 'stress' | 'custom'
               sleep_hours    — float (3–12)
               exercise_days  — int (0–7)
               water_intake   — int (1–15)
               stress_level   — float (1–10)
               screen_time    — float (0–16)

    Returns
    -------
    SimulationScenario (already saved to DB)

    Raises
    ------
    ValueError if the user has no DigitalTwin yet.
    """
    try:
        twin = user.digital_twin
    except Exception:
        raise ValueError(
            'No DigitalTwin found for this user. '
            'Please create your digital twin first.'
        )

    # ── Extract & coerce inputs ──────────────────────────────
    scenario_name = params.get('scenario', 'custom')
    sleep = float(params.get('sleep_hours', twin.sleep_hours))
    exercise = int(params.get('exercise_days', twin.exercise_days))
    water = int(params.get('water_intake', twin.water_intake))
    stress = float(params.get('stress_level', twin.stress_level))
    screen = float(params.get('screen_time', twin.screen_time))

    # ── Run engine ───────────────────────────────────────────
    predicted_health = compute_health_score(sleep, exercise, water, stress, screen)
    predicted_stress = compute_stress_score(sleep, stress, screen)
    predicted_energy = compute_energy_score(sleep, exercise, water)
    predicted_longevity = compute_longevity_score(sleep, exercise, water, stress)

    # ── Persist result ───────────────────────────────────────
    scenario = SimulationScenario.objects.create(
        twin=twin,
        scenario_name=scenario_name,
        sleep_hours=sleep,
        exercise_days=exercise,
        water_intake=water,
        stress_level=stress,
        screen_time=screen,
        predicted_health=predicted_health,
        predicted_stress=predicted_stress,
        predicted_energy=predicted_energy,
        predicted_longevity=predicted_longevity,
    )

    return scenario
