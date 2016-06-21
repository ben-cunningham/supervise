from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response

from serializers import EstimatorSerializer, ForemanSerializer
from models import Estimator, Foreman, Employee
from team.models import Team


class EstimatorList(generics.ListCreateAPIView):
    queryset = Estimator.objects.all()
    serializer_class = EstimatorSerializer


class EstimatorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Estimator.objects.all()
    serializer_class = EstimatorSerializer


class ForemanList(generics.ListCreateAPIView):
    def get_queryset(self):
        employee = Employee.objects.get(user=self.request.user)
        team = Team.objects.get(pk=employee.team.pk)
        try:
            if employee.is_admin:
                return Foreman.objects.filter(team=team)
        except:
            return None

    serializer_class = ForemanSerializer


class ForemanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Foreman.objects.all()
    serializer_class = ForemanSerializer


class Me(APIView):
    """
    View to get the current user's profile, as
    well as update their settings
    """

    def get(self, request, format=None):
        pass

    def post(self, request, format=None):
        pass
