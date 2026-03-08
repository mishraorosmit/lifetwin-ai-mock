"""
apps/simulation/engine.py
─────────────────────────
Pure, stateless scoring functions.
No I/O, no DB access — takes numbers in, returns numbers out.

Scoring methodology (research-informed heuristics):
  Sleep quality  → strongest predictor of health & stress
  Exercise days  → biggest driver of energy & longevity
  Water intake   → moderate impact across all metrics
  Stress level   → inverse relationship with health/energy
  Screen time    → inverse (high screen = poor sleep, more stress)
"""


def _clamp(value: float, lo: float = 0.0, hi: float = 100.0) -> float:
    """Ensure a value stays within [lo, hi]."""
    return max(lo, min(hi, value))


# ─── Individual Score Computations ───────────────────────────

def compute_health_score(
    sleep: float,
    exercise: int,
    water: int,
    stress: float,
    screen: float,
) -> float:
    """
    Overall health score 0–100.

    Weights:
      sleep    40%  (optimal = 8h)
      exercise 25%  (optimal = 7 days)
      water    15%  (optimal = 12 glasses)
      stress   12%  (lower is better; 1/10 = best)
      screen   8%   (lower is better; 0h = best)
    """
    sleep_score = _clamp((sleep / 8.0) * 100, 0, 100) * 0.40
    exercise_score = _clamp((exercise / 7.0) * 100, 0, 100) * 0.25
    water_score = _clamp((water / 12.0) * 100, 0, 100) * 0.15
    # Stress is inverse — 1 = best (100 pts), 10 = worst (0 pts)
    stress_score = _clamp(((10 - stress) / 9.0) * 100, 0, 100) * 0.12
    # Screen is inverse — 0h = best, 16h = worst
    screen_score = _clamp(((16 - screen) / 16.0) * 100, 0, 100) * 0.08

    return round(_clamp(sleep_score + exercise_score + water_score + stress_score + screen_score), 1)


def compute_stress_score(
    sleep: float,
    stress: float,
    screen: float,
) -> float:
    """
    Predicted stress level 0–10 (lower = better).

    Starting from the input stress, sleep and screen time act as modifiers.
    """
    # Sleep reduces stress (more sleep → lower stress)
    sleep_relief = max(0.0, (sleep - 6) * 0.3)
    # High screen time adds stress
    screen_penalty = max(0.0, (screen - 4) * 0.15)

    result = stress - sleep_relief + screen_penalty
    return round(_clamp(result, 1.0, 10.0), 1)


def compute_energy_score(
    sleep: float,
    exercise: int,
    water: int,
) -> float:
    """
    Predicted energy level 0–100.

    Primarily driven by sleep, exercise, and hydration.
    """
    sleep_score = _clamp((sleep / 9.0) * 100, 0, 100) * 0.45
    exercise_score = _clamp((exercise / 7.0) * 100, 0, 100) * 0.35
    water_score = _clamp((water / 10.0) * 100, 0, 100) * 0.20

    return round(_clamp(sleep_score + exercise_score + water_score), 1)


def compute_longevity_score(
    sleep: float,
    exercise: int,
    water: int,
    stress: float,
) -> float:
    """
    Predicted longevity index 0–100.

    Long-term outcomes: exercise and low stress are most impactful.
    """
    sleep_score = _clamp((sleep / 8.0) * 100, 0, 100) * 0.25
    exercise_score = _clamp((exercise / 7.0) * 100, 0, 100) * 0.35
    water_score = _clamp((water / 10.0) * 100, 0, 100) * 0.15
    stress_score = _clamp(((10 - stress) / 9.0) * 100, 0, 100) * 0.25

    return round(_clamp(sleep_score + exercise_score + water_score + stress_score), 1)
