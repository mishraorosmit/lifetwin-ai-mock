"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from apps.dashboard.urls import api_urlpatterns as dashboard_api_patterns

urlpatterns = [
    path('admin/', admin.site.urls),

    # ─── App URL namespaces ────────────────────────────────────
    path('', include('apps.core.urls')),
    path('', include('apps.users.urls')),
    path('twin/', include('apps.twin.urls')),
    path('simulation/', include('apps.simulation.urls')),
    path('dashboard/', include('apps.dashboard.urls')),

    # ─── REST-style API Endpoints ─────────────────────────────
    # All API routes live under /api/ to separate them from page views.
    path('api/', include(dashboard_api_patterns)),
]
