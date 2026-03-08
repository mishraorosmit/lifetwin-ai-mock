from django.shortcuts import render


def landing_page(request):
    """Home page — renders the marketing landing template."""
    return render(request, 'core/landing.html')


def about_page(request):
    """About page."""
    return render(request, 'core/about.html')


def features_page(request):
    """Features page."""
    return render(request, 'core/features.html')

