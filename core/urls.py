from django.conf.urls import url, include

urlpatterns = [
    url(r'', include('main.urls')),
    url(r'', include('sign_in.urls')),
    url(r'', include('employees.urls')),
    url(r'', include('tasks.urls')),
    url(r'', include('invitation.urls'))
]
