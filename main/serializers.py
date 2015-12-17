from rest_framework import serializers
from django.contrib.auth.models import User
from models import Job, Estimator, Quote, House, Foreman
from models import JOB_CHOICES, QUOTE_STATE


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = (
			'username',
			'password',
			'email',
			'first_name',
			'last_name'
		)

class HouseSerializer(serializers.ModelSerializer):
	jobs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

	class Meta:
		model = House
		fields = (
			'pk',
			'address',
			'jobs',
		)


class EstimatorSerializer(serializers.ModelSerializer):
	avg_estimate = serializers.IntegerField(required=False)
	jobs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	user = UserSerializer()

	class Meta:
		model = Estimator
		fields = (
			'pk',
			'user',
			'avg_estimate',
			'jobs',
			'is_admin',
		)

	def create(self, validated_data):
		user = User.objects.create(
			username=validated_data['user']['username'],
            email = validated_data['user']['email'],
            first_name = validated_data['user']['first_name'],
            last_name = validated_data['user']['last_name'],
		)
		user.set_password(validated_data['user']['password'])

		user.save()

		estimator = Estimator.objects.create(
			user = user,
			is_admin = validated_data['is_admin'],
		)
		estimator.save()
		return estimator


class ForemanSerializer(serializers.ModelSerializer):
	jobs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	user = UserSerializer()

	class Meta:
		model = Foreman
		fields = (
			'pk',
			'user',
			'jobs',
			'is_admin'
		)

	def create(self, validated_data):
		user = User.objects.create(
			username=validated_data['user']['username'],
            email = validated_data['user']['email'],
            first_name = validated_data['user']['first_name'],
            last_name = validated_data['user']['last_name'],
		)
		user.set_password(validated_data['user']['password'])
		user.save()

		foreman = Foreman.objects.create(
			user = user
		)
		foreman.save()
		return foreman


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
