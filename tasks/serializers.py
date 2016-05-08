from rest_framework import serializers
from django.contrib.auth.models import User
from models import Job, Quote, JOB_CHOICES, QUOTE_STATE
from main.serializers import HouseSerializer
from main.models import Team
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

    def create(self, validated_data):
        view = self.context['view']
        team_pk = view.kwargs['team_pk']
        team = Team.objects.get(pk=team_pk)
        try:
            print(validated_data)
            job = Job.objects.create(
                team=team,
                house=validated_data['house'],
                budget=validated_data['budget'],
                current_hours_spent=validated_data['current_hours_spent'],
                completed=validated_data['completed'],
                job_type=validated_data['job_type'],
                estimator=validated_data['estimator'],
                foreman=validated_data['foreman'],
            )
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
        try:
            estimator = Estimator.objects.get(user=request.user)
            quote_to_submit = Quote.objects.create(
                quote=validated_data['quote'],
                house=validated_data['house'],
                estimator=estimator,
                team=estimator.team,
            )
            quote_to_submit.save()
            return quote_to_submit
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
