from django.urls import path
from . import views

urlpatterns = [
    path('', views.simulation_view, name='simulation'),
    path('result/', views.simulation_result_view, name='simulation_result'),
    path('history/', views.simulation_history_view, name='simulation_history'),
]
