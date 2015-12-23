from rest_framework import serializers
from models import House, Team

class TeamSerializer(serializers.ModelSerializer):

	class Meta:
		model = Team
		fields = (
			'pk',
			'name',
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
