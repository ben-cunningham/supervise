from rest_framework import serializers
from models import Job, Estimator, JOB_CHOICES


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
		fields = ('pk',
				  'address',
				  'budget',
				  'current_hours_spent',
				  'completed',
				  'job_type',
				  'estimator',
		)