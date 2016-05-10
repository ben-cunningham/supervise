from django.db import models
from django.contrib.auth.models import User
from team.models import Team

class Employee(models.Model):
    is_admin = models.BooleanField(default=False)
    user = models.OneToOneField(User, null=True)
    team = models.ForeignKey(Team, null=True, related_name='estimators')

class Foreman(Employee):
    avg_profit = models.IntegerField(default=0)

class Estimator(Employee):
    avg_estimate = models.IntegerField(default=0)
