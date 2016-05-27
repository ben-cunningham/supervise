from rest_framework import serializers
from models import Team
from tasks.models import Job

class TeamSerializer(serializers.ModelSerializer):
    # jobs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Team
        fields = (
            'pk',
            'name',
            # 'avatar',
            # 'jobs',
        )