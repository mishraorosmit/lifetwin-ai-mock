from django.db import models
from django.contrib.auth.models import User


class DigitalTwin(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    sleep_hours = models.FloatField()
    exercise_frequency = models.IntegerField()
    diet_score = models.FloatField()

    stress_level = models.FloatField()
    work_hours = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Twin of {self.user.username}"