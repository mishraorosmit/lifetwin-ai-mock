from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_page, name='home'),
    path('about/', views.about_page, name='about'),
    path('features/', views.features_page, name='features'),
]
