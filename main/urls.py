from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = (
    url(r'^teams/$', views.TeamList.as_view()),
    url(r'^teams/(?P<pk>[0-9]+)/$', views.TeamDetail.as_view()),
    url(r'^houses/$', views.HouseList.as_view()),
    url(r'^houses/(?P<pk>[0-9]+)/$', views.HouseDetail.as_view()),
    url(r'^login/$', 'rest_framework_jwt.views.obtain_jwt_token'),
    url(r'^verify-token/$', 'rest_framework_jwt.views.refresh_jwt_token'),
)

urlpatterns = format_suffix_patterns(urlpatterns)
