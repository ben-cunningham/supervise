from rest_framework import generics
from serializers import TeamSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from invitation.models import Invitation
from employees.models import Employee
from models import Team

class TeamList(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class TeamDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

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