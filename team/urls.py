from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = (
    url(r'^teams/$', views.TeamList.as_view()),
    url(r'^teams/(?P<pk>[0-9]+)$', views.TeamDetail.as_view()),
    url(r'^teams/(?P<team_pk>[0-9]+)/invite$', views.create_invitation),
)

urlpatterns = format_suffix_patterns(urlpatterns)
