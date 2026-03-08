from django.db import models
from django.contrib.auth.models import User


class DigitalTwin(models.Model):
    """
    A user's AI digital twin — stores both personal biometrics and
    daily lifestyle habits used as inputs to the simulation engine.
    """

    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]

    DIET_CHOICES = [
        ('balanced', 'Balanced'),
        ('vegetarian', 'Vegetarian'),
        ('vegan', 'Vegan'),
        ('keto', 'Keto'),
        ('other', 'Other'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='digital_twin')

    # ── Personal Info ────────────────────────────────────────
    age = models.IntegerField(default=25)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='male')
    height = models.FloatField(default=170.0, help_text='cm')
    weight = models.FloatField(default=70.0, help_text='kg')

    # ── Lifestyle Habits ─────────────────────────────────────
    sleep_hours = models.FloatField(default=7.0, help_text='hours per night')
    exercise_days = models.IntegerField(default=3, help_text='days per week')
    water_intake = models.IntegerField(default=6, help_text='glasses per day')
    stress_level = models.FloatField(default=5.0, help_text='1–10 scale')
    screen_time = models.FloatField(default=6.0, help_text='hours per day')
    diet = models.CharField(max_length=20, choices=DIET_CHOICES, default='balanced')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Twin of {self.user.username}"