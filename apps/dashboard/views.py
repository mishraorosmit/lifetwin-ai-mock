from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse


# ─── Dashboard Page ───────────────────────────────────────────

@login_required
def dashboard_view(request):
    """
    Main analytics dashboard page.

    Pulls the user's twin + most recent simulation to prime the
    quick-stats cards. Chart animations are handled client-side
    by dashboard.js; the API endpoints below provide real data.
    """
    twin = getattr(request.user, 'digital_twin', None)

    last_sim = None
    total_sims = 0
    if twin:
        simulations = twin.simulations.all()
        total_sims = simulations.count()
        last_sim = simulations.first()   # ordered by -created_at

    context = {
        'twin': twin,
        'last_sim': last_sim,
        'total_sims': total_sims,
    }
    return render(request, 'dashboard/dashboard_page.html', context)


# ─── Dashboard API Endpoints ──────────────────────────────────

@login_required
def api_dashboard_stats(request):
    """
    GET /api/dashboard/stats/

    Returns a single-object snapshot used to prime the four
    quick-stat cards on the dashboard.  Returns safe zeros when
    the user has not yet created a twin or run a simulation.

    Response shape:
        {
            "has_twin": bool,
            "health_score": float,       # 0–100
            "stress_level": float,       # 0–10
            "energy_level": float,       # 0–100
            "longevity_index": float,    # 0–100
            "overall_score": int,
            "total_simulations": int
        }
    """
    twin = getattr(request.user, 'digital_twin', None)

    if not twin:
        return JsonResponse({
            'has_twin': False,
            'health_score': 0,
            'stress_level': 0,
            'energy_level': 0,
            'longevity_index': 0,
            'overall_score': 0,
            'total_simulations': 0,
        })

    last_sim = twin.simulations.first()   # newest first (ordering = -created_at)
    total_sims = twin.simulations.count()

    if last_sim:
        data = {
            'has_twin': True,
            'health_score': last_sim.predicted_health,
            'stress_level': last_sim.predicted_stress,
            'energy_level': last_sim.predicted_energy,
            'longevity_index': last_sim.predicted_longevity,
            'overall_score': last_sim.overall_score,
            'total_simulations': total_sims,
        }
    else:
        data = {
            'has_twin': True,
            'health_score': 0,
            'stress_level': 0,
            'energy_level': 0,
            'longevity_index': 0,
            'overall_score': 0,
            'total_simulations': 0,
        }

    return JsonResponse(data)


@login_required
def api_health_trend(request):
    """
    GET /api/dashboard/health-trend/

    Returns time-series data for the health + energy trend chart,
    built from the user's last 10 simulations (oldest → newest).

    Response shape:
        {
            "labels": ["Mar 01", ...],
            "health":  [float, ...],
            "energy":  [float, ...],
            "stress":  [float, ...]
        }
    """
    twin = getattr(request.user, 'digital_twin', None)

    if not twin:
        return JsonResponse({'labels': [], 'health': [], 'energy': [], 'stress': []})

    # Fetch last 10 simulations in ascending date order for the chart
    simulations = list(twin.simulations.order_by('created_at')[:10])

    if not simulations:
        return JsonResponse({'labels': [], 'health': [], 'energy': [], 'stress': []})

    labels  = [s.created_at.strftime('%b %d') for s in simulations]
    health  = [s.predicted_health   for s in simulations]
    energy  = [s.predicted_energy   for s in simulations]
    stress  = [s.predicted_stress   for s in simulations]

    return JsonResponse({
        'labels': labels,
        'health': health,
        'energy': energy,
        'stress': stress,
    })


@login_required
def api_lifestyle_breakdown(request):
    """
    GET /api/dashboard/lifestyle-breakdown/

    Returns the user's current DigitalTwin lifestyle parameters
    as percentage scores relative to their optimal values, used
    to drive the doughnut chart and lifestyle bars.

    Response shape:
        {
            "has_twin": bool,
            "sleep_pct": int,       # sleep_hours / 9 * 100
            "exercise_pct": int,    # exercise_days / 7 * 100
            "water_pct": int,       # water_intake / 12 * 100
            "stress_pct": int,      # (10 - stress_level) / 9 * 100
            "screen_pct": int,      # (16 - screen_time) / 16 * 100
            "sleep_hours": float,
            "exercise_days": int,
            "water_intake": int,
            "stress_level": float,
            "screen_time": float,
            "diet": str
        }
    """
    twin = getattr(request.user, 'digital_twin', None)

    if not twin:
        return JsonResponse({'has_twin': False})

    def pct(val, optimal):
        """Clamp a ratio to 0–100."""
        return min(100, max(0, round(val / optimal * 100)))

    return JsonResponse({
        'has_twin': True,
        # Raw values
        'sleep_hours':    twin.sleep_hours,
        'exercise_days':  twin.exercise_days,
        'water_intake':   twin.water_intake,
        'stress_level':   twin.stress_level,
        'screen_time':    twin.screen_time,
        'diet':           twin.diet,
        # Percentage scores (0–100)
        'sleep_pct':    pct(twin.sleep_hours, 9.0),
        'exercise_pct': pct(twin.exercise_days, 7),
        'water_pct':    pct(twin.water_intake, 12),
        # Stress & screen are inverted — lower is better
        'stress_pct':   pct(10 - twin.stress_level, 9.0),
        'screen_pct':   pct(16 - twin.screen_time, 16.0),
    })


@login_required
def api_simulation_history(request):
    """
    GET /api/simulation/history/

    Returns the user's 20 most recent simulation runs, newest first.
    Used to populate the Recent Simulations list on the dashboard
    and any other client-side history display.

    Response shape:
        {
            "count": int,
            "simulations": [
                {
                    "id": int,
                    "scenario_name": str,
                    "scenario_display": str,
                    "overall_score": int,
                    "predicted_health": float,
                    "predicted_stress": float,
                    "predicted_energy": float,
                    "predicted_longevity": float,
                    "created_at": "YYYY-MM-DD HH:MM"
                },
                ...
            ]
        }
    """
    twin = getattr(request.user, 'digital_twin', None)

    if not twin:
        return JsonResponse({'count': 0, 'simulations': []})

    simulations = twin.simulations.all()[:20]

    payload = [
        {
            'id':                   s.pk,
            'scenario_name':        s.scenario_name,
            'scenario_display':     s.get_scenario_name_display(),
            'overall_score':        s.overall_score,
            'predicted_health':     s.predicted_health,
            'predicted_stress':     s.predicted_stress,
            'predicted_energy':     s.predicted_energy,
            'predicted_longevity':  s.predicted_longevity,
            'created_at':           s.created_at.strftime('%Y-%m-%d %H:%M'),
        }
        for s in simulations
    ]

    return JsonResponse({'count': len(payload), 'simulations': payload})
