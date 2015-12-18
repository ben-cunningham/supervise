from django.db import models

class Organization(models.Model):
	name = models.CharField(max_length=200)

class House(models.Model):
	address = models.CharField(max_length=100)
	company = models.ForeignKey(Organization, null=True, related_name='houses')
