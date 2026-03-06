from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    age = models.IntegerField()
    height = models.FloatField()
    weight = models.FloatField()

    occupation = models.CharField(max_length=200)
    city = models.CharField(max_length=200)

    def __str__(self):
        return self.user.username
