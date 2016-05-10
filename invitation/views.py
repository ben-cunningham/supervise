from django.shortcuts import render
from django.contrib.auth.models import User
from django.template import RequestContext
from django.shortcuts import redirect
from models import Invitation
from forms import ForemanSignUpForm
from employees.models import Foreman, Employee

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
