from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = (
    url(r'^api/jobs/$', views.JobList.as_view()),
    url(r'^api/jobs/(?P<pk>[0-9]+)/$', views.JobDetail.as_view()),
    url(r'^api/quotes/$', views.QuoteList.as_view()),
    url(r'^api/quotes/(?P<pk>[0-9]+)/$', views.QuoteDetail.as_view()),
    url(r'^api/results/$', views.results_calculator.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)
