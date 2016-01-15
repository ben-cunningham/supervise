from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = (
    url(r'^api/teams/(?P<team_pk>[0-9]+)/invite$', views.create_invitation),
    url(r'^invite/', views.invitation_view),
)

urlpatterns = format_suffix_patterns(urlpatterns)
