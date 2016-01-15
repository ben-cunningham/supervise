from django.shortcuts import render
from django.contrib.auth.models import User
from django.template import RequestContext
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework import viewsets, status
from rest_framework.response import Response
from models import Invitation
from forms import ForemanSignUpForm
from employees.models import Foreman, Employee
from main.models import Team\

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

def invitation_view(request):
    if request.method == 'POST':
        form = ForemanSignUpForm(request.POST)
        if form.is_valid():
            invitation = Invitation.objects.get(uid=request.POST['invite_uid'])
            user = User.objects.create(
                username = request.POST['username'],
                email = invitation.email,
                first_name = request.POST['first_name'],
                last_name = request.POST['last_name'],
            )
            user.set_password(request.POST['password'])
            user.save()
            foreman = Foreman.objects.create(
                user = user,
                team = invitation.team,
            )
            foreman.save()
            return redirect('/login/')
    else:
        form = ForemanSignUpForm()
    return render(request, 'foreman_sign_up.html', {'form' : form}, context_instance=RequestContext(request))
