from django.db import models
from units import UNIT_CHOICES

class Material(models.Model):
    name = models.CharField(max_length=100)
    total_quantity = models.PositiveIntegerField()
    units = models.CharField(choices=UNIT_CHOICES)

class Team(models.Model):
    name = models.CharField(max_length=200)
    avatar = models.URLField()