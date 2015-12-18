from django.db import models
from django.contrib.auth.models import User
from main.models import Organization

class Employee(models.Model):
	is_admin = models.BooleanField(default=False)
	user = models.OneToOneField(User, null=True)

class Foreman(Employee):
	avg_profit = models.IntegerField(default=0)

class Estimator(Employee):
	avg_estimate = models.IntegerField(default=0)
	company = models.ForeignKey(Organization, null=True, related_name='estimators')
