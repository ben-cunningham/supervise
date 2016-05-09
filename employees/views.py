from rest_framework import generics
from serializers import EstimatorSerializer, ForemanSerializer
from models import Estimator, Foreman, Employee
from main.models import Team

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
