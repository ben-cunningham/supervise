from models import House, Team
from serializers import HouseSerializer, TeamSerializer
from rest_framework import generics


class TeamList(generics.ListCreateAPIView):
	queryset = Team.objects.all()
	serializer_class = TeamSerializer

class TeamDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Team.objects.all()
	serializer_class = TeamSerializer

class HouseList(generics.ListCreateAPIView):
	queryset = House.objects.all()
	serializer_class = HouseSerializer

class HouseDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = House.objects.all()
	serializer_class = HouseSerializer
