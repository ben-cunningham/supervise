from django.views.generic.base import TemplateView
from django.shortcuts import render
from forms import LoginForm
from rest_framework_jwt.settings import api_settings
from django.http import JsonResponse
from django.contrib.auth import authenticate

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class AppView(TemplateView):
	template_name = 'index.html'

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            return JsonResponse({
                'token' : token,
			})
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form' : form})

# class SignUpView(request):
