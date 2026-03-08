from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .forms import RegistrationForm, LoginForm


# ─── Registration ────────────────────────────────────────────

def register_view(request):
    """
    GET  → show empty registration form.
    POST → validate, create User, auto-login, redirect to create_twin.
    """
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            # Guard against duplicate usernames
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username already taken. Please choose another.')
                return render(request, 'users/register.html', {'form': form})

            # Create user and auto-login
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
            )
            login(request, user)
            messages.success(request, f'Welcome to LifeTwin, {username}! Build your digital twin.')
            return redirect('create_twin')

        # Form invalid — re-render with errors
        messages.error(request, 'Please fix the errors below.')
        return render(request, 'users/register.html', {'form': form})

    # GET request
    form = RegistrationForm()
    return render(request, 'users/register.html', {'form': form})


# ─── Login ───────────────────────────────────────────────────

def login_view(request):
    """
    GET  → show login form.
    POST → authenticate user, login, redirect to next or dashboard.
    """
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                next_url = request.GET.get('next', 'dashboard')
                return redirect(next_url)

            messages.error(request, 'Invalid username or password.')

        return render(request, 'users/login.html', {'form': form})

    form = LoginForm()
    return render(request, 'users/login.html', {'form': form})


# ─── Logout ──────────────────────────────────────────────────

def logout_view(request):
    """Log out and redirect to home."""
    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('home')


# ─── Profile ─────────────────────────────────────────────────

@login_required
def profile_view(request):
    """Show the logged-in user's profile page."""
    return render(request, 'users/profile.html', {'profile_user': request.user})

