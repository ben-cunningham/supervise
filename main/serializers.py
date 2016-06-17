from rest_framework import serializers
from models import House, Address
from team.models import Team


class AddressSerializer(serializers.ModelSerializer):
    """
    Serializer for the Address model
    """

    class Meta:
        model = Address
        fields = (
            'pk',
            'line1',
            'line2',
            'city',
            'state',
            'zip',
            'country',
        )

class HouseSerializer(serializers.ModelSerializer):
    jobs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    address = AddressSerializer()

    class Meta:
        model = House
        fields = (
            'pk',
            'address',
            'jobs',
        )

    def create(self, validated_data):
        view = self.context['view']
        team_pk = view.kwargs['team_pk']
        team = Team.objects.get(pk=team_pk)
        try:
            address = Address.objects.create(
                line1=validated_data['line1'],
                line2=validated_data['line2'],
                city=validated_data['city'],
                state=validated_data['state'],
                zip=validated_data['zip'],
                country=validated_data['country'],
            )
            address.save()

            house = House.objects.create(
                address=address,
                team=team,
            )

            house.save()
            return house
        except:
            return None

