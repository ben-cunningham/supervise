from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = (
    url(r'^api/teams/$', views.TeamList.as_view()),
    url(r'^api/teams/(?P<pk>[0-9]+)/$', views.TeamDetail.as_view()),
    url(r'^api/houses/$', views.HouseList.as_view()),
    url(r'^api/houses/(?P<pk>[0-9]+)/$', views.HouseDetail.as_view()),
    url(r'^api/login/$', 'rest_framework_jwt.views.obtain_jwt_token'),
    url(r'^api/verify-token/$', 'rest_framework_jwt.views.refresh_jwt_token'),
)

urlpatterns = format_suffix_patterns(urlpatterns)
