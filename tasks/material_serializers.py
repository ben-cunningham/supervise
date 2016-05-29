from rest_framework import serializers

from models import (
    Material,
    CheckedOutMaterial,
    Job,
)

from team.models import (
    Team,
)

from units import UNIT_CHOICES


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

class MaterialSerializer(serializers.ModelSerializer):
    units = serializers.ChoiceField(choices=UNIT_CHOICES)
    team = serializers.PrimaryKeyRelatedField(required=False, read_only=True)
    checked_out_materials = CheckedOutMaterialSerializer(many=True, required=False)

    class Meta:
        model = Material
        fields = (
            'pk',
            'name',
            'total_quantity',
            'units',
            'team',
            'checked_out_materials',
        )

    def create(self, validated_data):
        view = self.context['view']
        team_pk = view.kwargs['team_pk']
        team = Team.objects.get(pk=team_pk)
        print validated_data
        material = Material.objects.create(
            name=validated_data['name'],
            total_quantity=validated_data['total_quantity'],
            units=validated_data['units'],
            team=team,
        )

        return material