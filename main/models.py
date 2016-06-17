from django.db import models
from team.models import Team


class Address(models.Model):
    line1 = models.CharField(max_length=200)
    line2 = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip = models.CharField(max_length=6)
    country = models.CharField(max_length=50)


class House(models.Model):
    address = models.OneToOneField(Address, default=None)
    company = models.ForeignKey(Team, null=True, related_name='houses')

