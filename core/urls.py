from django.conf.urls import url, include

urlpatterns = [
    url(r'api/', include('main.urls')),
    url(r'api/', include('employees.urls')),
    url(r'api/', include('tasks.urls')),
    url(r'', include('invitation.urls')),
    url(r'', include('sign_in.urls'))
]
