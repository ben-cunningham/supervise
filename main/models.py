from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=200)

class House(models.Model):
    address = models.CharField(max_length=100)
    company = models.ForeignKey(Team, null=True, related_name='houses')

