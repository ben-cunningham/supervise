from rest_framework import serializers
from models import House, Address
from team.models import Team


class AddressSerializer(serializers.ModelSerializer):
    """
    Serializer for the Address model
    """

    line2 = serializers.CharField(required=False)

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
                line1=validated_data['address']['line1'],
                city=validated_data['address']['city'],
                state=validated_data['address']['state'],
                zip=validated_data['address']['zip'],
                country=validated_data['address']['country'],
            )

            if 'line2' in validated_data['address']:
                address.zip = validated_data['address']['line2']

            address.save()

            print address
            print team

            house = House.objects.create(
                address=address,
                company=team,
            )

            house.save()
            return house
        except Exception, e:
            print e
            return None

