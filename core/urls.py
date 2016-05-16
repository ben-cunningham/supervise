from django.conf.urls import url, include

urlpatterns = [
    url(r'api/', include('main.urls')),
    url(r'api/', include('employees.urls')),
    url(r'api/', include('tasks.urls')),
    url(r'api/', include('team.urls')),
    url(r'api/', include('image.urls')),
    url(r'invite/', include('invitation.urls')),
    url(r'login(/)?', include('sign_in.urls')),
    url(r'', include('app.urls'))
]
