from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_twin_view, name='create_twin'),
]
