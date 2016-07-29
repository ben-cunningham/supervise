from rest_framework import serializers

from models import (
    Job,
    Quote,
    CheckIn,

    JOB_CHOICES,
    QUOTE_STATE
)

from material_serializers import CheckedOutMaterialSerializer

from main.serializers import HouseSerializer
from team.models import Team
from employees.serializers import EstimatorSerializer, ForemanSerializer
from employees.models import Estimator

class CheckInSerializer(serializers.ModelSerializer):

    class Meta:
        model = CheckIn
        fields = (
            'pk',
            'created',
            'text',
        )

    def create(self, validated_data):
        view = self.context['view']
        job_pk = view.kwargs['pk']
        job = Job.objects.get(pk=job_pk)
        check_in = CheckIn.objects.create(
            text=validated_data['text'],
            job=job,
        )
        check_in.save()
        return check_in


class JobListSerializer(serializers.ModelSerializer):
    job_type = serializers.ChoiceField(choices=JOB_CHOICES)
    house = HouseSerializer()
    estimator = EstimatorSerializer()
    foreman = ForemanSerializer()
    check_ins = CheckInSerializer(many=True, required=False)
    materials = CheckedOutMaterialSerializer(many=True)

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
            'check_ins',
            'materials',
            'images',
            'description',
        )

class JobCreateSerializer(serializers.ModelSerializer):
    job_type = serializers.ChoiceField(choices=JOB_CHOICES)
    images = serializers.JSONField(required=False)

    class Meta:
        model = Job
        fields = (
            'pk',
            'house',
            'budget',
            'description',
            'current_hours_spent',
            'completed',
            'job_type',
            'estimator',
            'foreman',
            'images',
        )

    def create(self, validated_data):
        view = self.context['view']
        team_pk = view.kwargs['team_pk']
        team = Team.objects.get(pk=team_pk)
        try:
            urls = validated_data.pop('images')
            job = Job.objects.create(**validated_data)
            job.team = team
            job.images = {'urls': urls}
            job.save()
            return job
        except:
            return None

class JobUpdateSerializer(serializers.ModelSerializer):
    job_type = serializers.ChoiceField(choices=JOB_CHOICES)

    class Meta:
        model = Job
        fields = (
            'pk',
            'house',
            'budget',
            'description',
            'current_hours_spent',
            'completed',
            'job_type',
            'estimator',
            'foreman',
            'images',
        )

class QuoteListSerializer(serializers.ModelSerializer):
    state = serializers.ChoiceField(choices=QUOTE_STATE, required=False)
    house = HouseSerializer()

    class Meta:
        model = Quote
        fields = (
            'pk',
            'quote',
            'state',
            'house',
            'estimator',
            'images',
            'thumbnail'
        )

class QuoteCreateSerializer(serializers.ModelSerializer):
    state = serializers.ChoiceField(choices=QUOTE_STATE, required=False)
    description = serializers.CharField(required=False)

    class Meta:
        model = Quote
        fields = (
            'pk',
            'quote',
            'state',
            'house',
            'description',
            'estimator',
            'images',
            'thumbnail',
        )

    def create(self, validated_data):
        request = self.context.get('request', None)
        try:
            estimator = Estimator.objects.get(user=request.user)
            quote_to_submit = Quote.objects.create(
                quote=validated_data['quote'],
                house=validated_data['house'],
                description=validated_data['description'],
                estimator=estimator,
                team=estimator.team,
                images={
                    'urls': validated_data['images']
                },
                thumbnail=validated_data['thumbnail'],
            )
            quote_to_submit.save()
            return quote_to_submit
        except:
            return None


class QuoteDetailSerializer(serializers.ModelSerializer):
    state = serializers.ChoiceField(choices=QUOTE_STATE, required=False)
    estimator = EstimatorSerializer()
    house = HouseSerializer()

    class Meta:
        model = Quote
        fields = (
            'pk',
            'quote',
            'state',
            'description',
            'house',
            'estimator',
            'images',
        )
