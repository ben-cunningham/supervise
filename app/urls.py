from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = (
    url(r'^.*$', views.AppView.as_view(), name='index'),
)

urlpatterns = format_suffix_patterns(urlpatterns)
