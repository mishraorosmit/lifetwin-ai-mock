from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .services import run_simulation
from .models import SimulationScenario


# ─── Simulation Form ─────────────────────────────────────────

@login_required
def simulation_view(request):
    """
    GET  → show the simulation form (simulation.html).
    POST → call run_simulation() service, store result pk in session,
           redirect to result page.
    """
    # Make sure user has a twin before showing the form
    if not hasattr(request.user, 'digital_twin'):
        messages.warning(request, 'Please create your Digital Twin first before running a simulation.')
        return redirect('create_twin')

    if request.method == 'POST':
        # Collect the active scenario's parameters from POST data.
        # The form has multiple named inputs; we take whichever are present.
        scenario = request.POST.get('scenario', 'custom')

        # Each scenario section uses its own input names
        params = {
            'scenario': scenario,
            'sleep_hours': _first_present(request.POST, ['sleep_hours', 'c_sleep_hours'], 7),
            'exercise_days': _first_present(request.POST, ['exercise_days', 'c_exercise_days'], 3),
            'water_intake': _first_present(request.POST, ['water_intake', 'c_water_intake'], 6),
            'stress_level': _first_present(request.POST, ['stress_level', 'c_stress_level'], 5),
            'screen_time': _first_present(request.POST, ['screen_time', 'c_screen_time'], 6),
        }

        try:
            result = run_simulation(request.user, params)
            # Save result PK in session so the result page can retrieve it
            request.session['last_simulation_id'] = result.pk
            return redirect('simulation_result')
        except ValueError as e:
            messages.error(request, str(e))
            return redirect('create_twin')

    return render(request, 'simulation/simulation.html')


def _first_present(post_dict, keys, default):
    """Return the value of the first key found in POST that has a non-empty value."""
    for key in keys:
        val = post_dict.get(key)
        if val is not None and val != '':
            return val
    return default


# ─── Simulation Result ───────────────────────────────────────

@login_required
def simulation_result_view(request):
    """
    Load the simulation result from session and render the result page.
    Context variables match what result.js expects (all mock-based here,
    the JS animates its own counters).
    """
    simulation_id = request.session.get('last_simulation_id')

    if not simulation_id:
        messages.warning(request, 'No simulation result found. Please run a simulation first.')
        return redirect('simulation')

    result = get_object_or_404(
        SimulationScenario,
        pk=simulation_id,
        twin__user=request.user,     # security: own result only
    )

    context = {
        'result': result,
        'health_score': result.predicted_health,
        'stress_level': result.predicted_stress,
        'energy_level': result.predicted_energy,
        'longevity_index': result.predicted_longevity,
        'overall_score': result.overall_score,
        'scenario_display': result.get_scenario_name_display(),
    }
    return render(request, 'simulation/simulate_result.html', context)


# ─── Simulation History ──────────────────────────────────────

@login_required
def simulation_history_view(request):
    """List all past simulations for the logged-in user."""
    if not hasattr(request.user, 'digital_twin'):
        simulations = []
    else:
        simulations = request.user.digital_twin.simulations.all()[:20]

    return render(request, 'simulation/simulation_history.html', {
        'simulations': simulations,
    })

