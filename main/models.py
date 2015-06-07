from django.db import models
from django.contrib.auth.models import User

JOB_CHOICES = (
	('p', 'Paint'),
	('pw', 'Pressure Wash'),
	('h', 'Hourly'),
)

class Forman(models.Model):
	user = models.OneToOneField(User)


class Estimator(models.Model):
	name = models.CharField(default='jd', max_length=100)
	avg_estimate = models.IntegerField(default=0)


class Job(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	estimator = models.ForeignKey(Estimator, null=True, related_name='jobs')
	budget = models.IntegerField()
	job_type = models.CharField(choices=JOB_CHOICES,
								default='h',
								max_length=100)
	address = models.CharField(max_length=100)
	completed = models.BooleanField(default=False)
	current_hours_spent = models.IntegerField()
	profit = models.IntegerField(default=0)
	
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
		