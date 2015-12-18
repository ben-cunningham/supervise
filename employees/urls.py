from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = (
    url(r'^api/estimators/(?P<pk>[0-9]+)/$', views.EstimatorDetail.as_view()),
    url(r'^api/estimators/$', views.EstimatorList.as_view()),
    url(r'^api/foreman/$', views.ForemanList.as_view()),
    url(r'^api/foreman/(?P<pk>[0-9]+)/$', views.ForemanDetail.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)
