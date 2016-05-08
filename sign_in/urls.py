from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = (
    url(r'^.*$', views.AppView.as_view(), name='index'),
    url(r'^login/$', views.login_view),
    url(r'^sign_up/$', views.sign_up),
)

urlpatterns = format_suffix_patterns(urlpatterns)
