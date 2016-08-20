from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response

from serializers import (
    EstimatorSerializer,
    ForemanSerializer,
    EmployeeSerialzier
)

from models import (
    Estimator,
    Foreman,
    Employee
)
from team.models import Team


class EstimatorList(generics.ListCreateAPIView):
    serializer_class = EstimatorSerializer

    def get_queryset(self):
        employee = Employee.objects.get(user=self.request.user)
        team = Team.objects.get(pk=employee.team.pk)
        try:
            if employee.is_admin:
                return Estimator.objects.filter(team=team)
        except:
            return None


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
        employee = Employee.objects.get(user=request.user)
        serialized = EmployeeSerialzier(employee)
        return Response(serialized.data, status=200)

    def patch(self, request, format=None):
        employee = Employee.objects.get(user=request.user)
        serializer = EmployeeSerialzier(employee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        employee = Employee.objects.get(user=request.user)
        serializer = EmployeeSerialzier(employee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)
