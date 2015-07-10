from rest_framework import serializers
from models import Job, Estimator, Quote, House, JOB_CHOICES


class HouseSerializer(serializers.ModelSerializer):
	quotes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	
	class Meta:
		model = House
		fields = (
			'pk',
			'address',
			'quotes',
		)


class EstimatorSerializer(serializers.ModelSerializer):
	avg_estimate = serializers.IntegerField(required=False)
	jobs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	
	class Meta:
		model = Estimator
		fields = (
			'pk',
			'avg_estimate',
			'name',
			'jobs',
		)


class JobSerializer(serializers.ModelSerializer):
	job_type = serializers.ChoiceField(choices=JOB_CHOICES)

	class Meta:
		model = Job
		fields = (
			'pk',
		  	'address',
		  	'budget',
		  	'current_hours_spent',
		  	'completed',
		  	'job_type',
		  	'estimator',
		)
			
class QuoteSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = Quote
		fields = (
			'pk',
			'quote',
			'won',
			'house',
		)