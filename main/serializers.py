from rest_framework import serializers
from models import House

class HouseSerializer(serializers.ModelSerializer):
	jobs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

	class Meta:
		model = House
		fields = (
			'pk',
			'address',
			'jobs',
		)
