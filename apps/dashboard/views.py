from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


@login_required
def dashboard_view(request):
    """
    Main analytics dashboard.

    Pulls the user's twin + most recent simulation to prime the
    quick-stats cards. All chart animations are handled client-side
    by dashboard.js using its built-in data.
    """
    user = request.user
    twin = getattr(user, 'digital_twin', None)

    # Fetch the latest simulation for summary stats
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

