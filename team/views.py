from rest_framework import generics
from serializers import TeamSerializer
from rest_framework.decorators import api_view , permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from invitation.models import Invitation
from employees.models import Employee
from employees.permissions import IsAdminPermission
from models import Team

class TeamList(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class TeamDetail(APIView):
    """
    """

    def get(self, request, pk):
        team = Team.objects.get(pk=pk)
        team_serializer = TeamSerializer(team)
        return Response(team_serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        employee = Employee.objects.get(user=request.user)
        if not employee or not employee.is_admin:
            return Response(status=status.HTTP_403_FORBIDDEN)

        team = Team.objects.get(pk=pk)
        team_serializer = TeamSerializer(team, data=request.data, partial=True)
        if team_serializer.is_valid():
            team_serializer.save()
            return Response(team_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_invitation(request, team_pk):
    email = None
    if request.method == 'POST':
        if 'email' in request.data:
            email = request.data['email']
        else:
            # TODO: Throw exception or return a 400
            return Response(status=status.HTTP_400_BAD_REQUEST)

        user = Employee.objects.get(user=request.user)
        team = user.team
        invitation = Invitation.create(email, team)
        invitation.send()
        invitation.save()
        return Response(status=status.HTTP_201_CREATED)