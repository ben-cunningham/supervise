from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = (
    url(r'^estimators/(?P<pk>[0-9]+)/$', views.EstimatorDetail.as_view()),
    url(r'^estimators/$', views.EstimatorList.as_view()),
    url(r'^foreman/$', views.ForemanList.as_view()),
    url(r'^foreman/(?P<pk>[0-9]+)/$', views.ForemanDetail.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)
