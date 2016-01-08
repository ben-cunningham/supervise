from rest_framework import serializers
from django.contrib.auth.models import User
from models import Foreman, Estimator, Employee

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

class EmployeeSerialzier(serializers.ModelSerializer):
	user = UserSerializer()

	class Meta:
		model = Employee
		fields = (
			'pk',
			'user',
			'team',
			'is_admin',
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
