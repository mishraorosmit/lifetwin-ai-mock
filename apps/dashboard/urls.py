from django.urls import path
from . import views

# ─── Dashboard Page ───────────────────────────────────────────
dashboard_urlpatterns = [
    path('', views.dashboard_view, name='dashboard'),
]

# ─── Dashboard/Simulation API Endpoints ──────────────────────
# Included under the /api/ prefix in config/urls.py
api_urlpatterns = [
    path('dashboard/stats/',             views.api_dashboard_stats,      name='api_dashboard_stats'),
    path('dashboard/health-trend/',      views.api_health_trend,         name='api_health_trend'),
    path('dashboard/lifestyle-breakdown/', views.api_lifestyle_breakdown, name='api_lifestyle_breakdown'),
    path('simulation/history/',          views.api_simulation_history,   name='api_simulation_history'),
]

# Default urlpatterns used when this module is included without a custom list
urlpatterns = dashboard_urlpatterns
