from rest_framework import serializers
from django.contrib.auth.models import User
from models import Job, Quote, JOB_CHOICES, QUOTE_STATE
from main.serializers import HouseSerializer
from employees.serializers import EstimatorSerializer, ForemanSerializer
from employees.models import Estimator

class JobListSerializer(serializers.ModelSerializer):
	job_type = serializers.ChoiceField(choices=JOB_CHOICES)
	house = HouseSerializer()

	class Meta:
		model = Job
		fields = (
			'pk',
		  	'house',
		  	'budget',
		  	'current_hours_spent',
		  	'completed',
		  	'job_type',
		  	'estimator',
			'foreman',
		)

class JobCreateSerializer(serializers.ModelSerializer):
	job_type = serializers.ChoiceField(choices=JOB_CHOICES)

	class Meta:
		model = Job
		fields = (
			'pk',
		  	'house',
		  	'budget',
		  	'current_hours_spent',
		  	'completed',
		  	'job_type',
		  	'estimator',
			'foreman',
		)

class JobUpdateSerializer(serializers.ModelSerializer):
	job_type = serializers.ChoiceField(choices=JOB_CHOICES)

	class Meta:
		model = Job
		fields = (
			'pk',
		  	'house',
		  	'budget',
		  	'current_hours_spent',
		  	'completed',
		  	'job_type',
		  	'estimator',
			'foreman',
		)
class JobDetailSerializer(serializers.ModelSerializer):
	job_type = serializers.ChoiceField(choices=JOB_CHOICES)
	estimator = EstimatorSerializer()
	foreman = ForemanSerializer()
	house = HouseSerializer()

	class Meta:
		model = Job
		fields = (
			'pk',
		  	'house',
		  	'budget',
		  	'current_hours_spent',
		  	'completed',
		  	'job_type',
		  	'estimator',
			'foreman',
		)

class QuoteListSerializer(serializers.ModelSerializer):
	state = serializers.ChoiceField(choices=QUOTE_STATE, required=False)

	class Meta:
		model = Quote
		fields = (
			'pk',
			'quote',
			'state',
			'house',
			'estimator',
		)

	def create(self, validated_data):
		request = self.context.get('request', None)
		user = None
		try:
			estimator = Estimator.objects.get(user=request.user)
			quote = Quote.objects.create(
				quote=validated_data['quote'],
				house=validated_data['house'],
				estimator=estimator,
			)
			quote.save()
			return quote
		except:
			return None


class QuoteDetailSerializer(serializers.ModelSerializer):
	state = serializers.ChoiceField(choices=QUOTE_STATE, required=False)
	estimator = EstimatorSerializer()

	class Meta:
		model = Quote
		fields = (
			'pk',
			'quote',
			'state',
			'house',
			'estimator',
		)
