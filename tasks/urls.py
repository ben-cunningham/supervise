from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = (
    url(r'^teams/(?P<team_pk>[0-9]+)/jobs/$', views.JobList.as_view()),
    url(r'^teams/(?P<team_pk>[0-9]+)/jobs/(?P<pk>[0-9]+)/$', views.JobDetail.as_view()),
    url(r'^teams/(?P<team_pk>[0-9]+)/jobs/(?P<pk>[0-9]+)/check_in$', views.CheckIn.as_view()),
    url(r'^teams/(?P<team_pk>[0-9]+)/jobs/(?P<pk>[0-9]+)/checked_out_material', views.CheckedOutMaterial.as_view()),

    url(r'^teams/(?P<team_pk>[0-9]+)/quotes/$', views.QuoteList.as_view()),
    url(r'^teams/(?P<team_pk>[0-9]+)/quotes/(?P<pk>[0-9]+)/$', views.QuoteDetail.as_view()),

    url(r'^teams/(?P<team_pk>[0-9]+)/material$', views.Material.as_view()),
    url(r'^teams/(?P<team_pk>[0-9]+)/results/$', views.results_calculator.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)
