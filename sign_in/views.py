from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.views.generic import TemplateView

from forms import LoginForm, SignUpForm
from employees.models import Estimator, Employee
from employees.serializers import EmployeeSerialzier
from main.models import Team

from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class AppView(TemplateView):
	template_name = 'index.html'

def jwt_response_payload_handler(token, user=None, request=None):
	employee = Employee.objects.get(user=user)
	return {
        'token': token,
        'employee': EmployeeSerialzier(employee).data
    }

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                return JsonResponse(jwt_response_payload_handler(token, user, request))
            else:
                #TODO Should return not authenticated error
                return None
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form' : form})

def sign_up(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            company = Team.objects.create(
                name = request.POST['company_name'],
            )
            company.save()

            user = User.objects.create(
                username = request.POST['username'],
                email = request.POST['email'],
                first_name = request.POST['first_name'],
                last_name = request.POST['last_name'],
            )
            user.set_password(request.POST['password'])
            user.save()
            estimator = Estimator.objects.create(
                user = user,
                team = company,
                is_admin = True,
            )
            estimator.save()
            return redirect('/login/')
    else:
        form = SignUpForm()
    return render(request, 'sign_up.html', {'form' : form})
