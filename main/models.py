from django.db import models


JOB_CHOICES = (
	('p', 'Paint'),
	('pw', 'Pressure Wash'),
	('h', 'Hourly'),
)


class Employee(models.Model):
	name = models.CharField(max_length=50)


class Estimator(Employee):
	avg_estimate = models.IntegerField()


class Job(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	estimator = models.OneToOneField(Estimator, null=True)
	budget = models.IntegerField()
	job_type = models.CharField(choices=JOB_CHOICES,
								default='h',
								max_length=100)
	address = models.CharField(max_length=100)
	completed = models.BooleanField(default=False)
	current_hours_spent = models.IntegerField()

	class Meta:
		ordering = ('created',)
