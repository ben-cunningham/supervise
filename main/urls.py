from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = (
	url(r'^jobs/$', views.JobList.as_view()),
    url(r'^jobs/(?P<pk>[0-9]+)/$', views.JobDetail.as_view()),
	url(r'^estimators/(?P<pk>[0-9]+)/$', views.EstimatorDetail.as_view()),
	url(r'^estimators/$', views.EstimatorList.as_view()),
	url(r'^results/$', views.results_calculator.as_view())
)

urlpatterns = format_suffix_patterns(urlpatterns)