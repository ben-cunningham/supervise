from django.db import models
from team.models import Team

class House(models.Model):
    address = models.CharField(max_length=100)
    company = models.ForeignKey(Team, null=True, related_name='houses')

