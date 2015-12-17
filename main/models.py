from django.db import models
from django.contrib.auth.models import User

JOB_CHOICES = (
	('p', 'Paint'),
	('pw', 'Pressure Wash'),
	('h', 'Hourly'),
)

QUOTE_STATE = (
	(0, 'Waiting'),
	(1, 'Accepted'),
	(2, 'Rejected')
)

class Employee(models.Model):
	is_admin = models.BooleanField(default=False)
	user = models.OneToOneField(User, null=True)

class Foreman(Employee):
	avg_profit = models.IntegerField(default=0)

class Estimator(Employee):
	avg_estimate = models.IntegerField(default=0)

class Organization(models.Model):
	name = models.CharField(max_length=200)

class House(models.Model):
	address = models.CharField(max_length=100)
	company = models.ForeignKey(Organization, null=True, related_name='houses')

class Quote(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	quote = models.IntegerField()
	state = models.IntegerField(choices=QUOTE_STATE, default=0)
	house = models.OneToOneField(House, null=True)
	estimator = models.ForeignKey(Estimator, null=True, related_name='quotes')

class Job(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	company = models.ForeignKey(Organization, null=True, related_name='jobs')
	estimator = models.ForeignKey(Estimator, null=True, related_name='jobs')
	foreman = models.ForeignKey(Foreman, null=True, related_name='jobs')
	budget = models.IntegerField()
	job_type = models.CharField(choices=JOB_CHOICES,
								default='h',
								max_length=100)
	house = models.ForeignKey(House, null=True, related_name='jobs')
	completed = models.BooleanField(default=False)
	current_hours_spent = models.IntegerField()
	profit = models.IntegerField(default=0)
	quote = models.OneToOneField(Quote, null=True)

	def calc_profit():
		return budget - current_hours_spend

	class Meta:
		ordering = ('created',)

class ResultsCalculator(object):
	def __init__(self, *args, **kw):
		pass

	def jobTotals(self):
		jobs = Job.objects.all();
		job_stats = []

		for job in jobs:
			job_stats.append((job.pk, job.address, job.profit))

		return job_stats

	def estimatorTotals(self):
		pass
