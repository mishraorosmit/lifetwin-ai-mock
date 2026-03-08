from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .forms import DigitalTwinForm
from .models import DigitalTwin


@login_required
def create_twin_view(request):
    """
    Create or update the logged-in user's DigitalTwin.

    GET  → pre-fill form with existing twin data (if any).
    POST → validate, save, redirect to simulation page.
    """
    # Use get_or_create so returning users can edit their twin
    twin, created = DigitalTwin.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        form = DigitalTwinForm(request.POST, instance=twin)
        if form.is_valid():
            form.save()
            action = 'created' if created else 'updated'
            messages.success(request, f'Your digital twin has been {action}! Time to run a simulation.')
            return redirect('simulation')

        messages.error(request, 'Please fix the errors below.')
        return render(request, 'twin/create_twin.html', {'form': form})

    # GET — pre-fill with existing values
    form = DigitalTwinForm(instance=twin)
    return render(request, 'twin/create_twin.html', {'form': form, 'twin': twin})

