from rest_framework import serializers
from models import Job, Estimator, JOB_CHOICES


class EstimatorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Estimator
		fields = (
			'avg_estimate',
			'name',
		)


class JobSerializer(serializers.ModelSerializer):
	# estimator = EstimatorSerializer(source='estimator')
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