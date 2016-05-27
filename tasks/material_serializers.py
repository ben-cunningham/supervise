from rest_framework import serializers

from models import (
    Material,
    CheckedOutMaterial,
    Job,
)

from team.models import (
    Team,
)

class MaterialSerializer(serializers.ModelSerializer):

    class Meta:
        model = Material
        fields = (
            'pk',
            'total_quantity',
            'units',
            'team',
            'checked_out_materials',
        )

    def create(self, validated_data):
        view = self.context['view']
        team_pk = view.kwargs['team_pk']
        team = Team.objects.get(pk=team_pk)
        material = Material.objects.create(
            name=validated_data['name'],
            quantity=validated_data['quantity'],
            units=validated_data['units'],
            team=team,
        )

        return material



class CheckedOutMaterialSerializer(serializers.ModelSerializer):

    class Meta:
        model = CheckedOutMaterial
        fields = (
            'pk',
            'quantity',
            'material',
            'job',
        )

    def create(self, validated_data):
        view = self.context['view']
        job_pk = view.kwargs['pk']
        job = Job.objects.get(pk=job_pk)
        material = Material.objects.get(pk=validated_data['material'])
        checked_out_material = CheckedOutMaterial.objects.create(
            name=validated_data['quantity'],
            material=material,
            job=job,
        )

        return checked_out_material