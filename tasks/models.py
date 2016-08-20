from django.db import models
from django.contrib.postgres.fields import JSONField

from main.models import House
from team.models import Team
from employees.models import Estimator, Foreman, Employee
from units import UNIT_CHOICES

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

class Quote(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    quote = models.IntegerField()
    description = models.TextField(default="")
    state = models.IntegerField(choices=QUOTE_STATE, default=0)
    house = models.OneToOneField(House, null=True)
    estimator = models.ForeignKey(Estimator, null=True, related_name='quotes')
    team = models.ForeignKey(Team, null=True, related_name='quotes')
    images = JSONField(blank=True, null=True)
    thumbnail = models.URLField(null=True)

class Job(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    team = models.ForeignKey(Team, null=True, related_name='jobs')
    estimator = models.ForeignKey(Estimator, null=True, related_name='jobs')
    foreman = models.ForeignKey(Foreman, null=True, related_name='jobs')
    budget = models.IntegerField()
    description = models.TextField()
    job_type = models.CharField(choices=JOB_CHOICES,
                                default='h',
                                max_length=100)
    house = models.ForeignKey(House, null=True, related_name='jobs')
    completed = models.BooleanField(default=False)
    current_hours_spent = models.IntegerField()
    profit = models.IntegerField(default=0)
    quote = models.OneToOneField(Quote, null=True)
    images = JSONField(blank=True, null=True)

    def calc_profit():
        return budget - current_hours_spend

    def __str__(self):
        return "%s" % self.house.address

    class Meta:
        ordering = ('created',)

class CheckIn(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=500)
    job = models.ForeignKey(Job, related_name='check_ins')
    foreman = models.ForeignKey(Employee, related_name='check_ins')

    class Meta:
        ordering = ('created',)

class Material(models.Model):
    name = models.CharField(max_length=100)
    total_quantity = models.PositiveIntegerField()
    units = models.CharField(choices=UNIT_CHOICES, max_length=10)
    team = models.ForeignKey(Team, null=True, related_name='materials')

class CheckedOutMaterial(models.Model):
    quantity = models.PositiveIntegerField()
    material = models.ForeignKey(Material, null=True, related_name='checked_out_materials')
    job = models.ForeignKey(Job, null=True, related_name='materials')

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
