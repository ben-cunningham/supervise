from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token

urlpatterns = (
    url(r'^houses/$', views.HouseList.as_view()),
    url(r'^houses/(?P<pk>[0-9]+)/$', views.HouseDetail.as_view()),
    url(r'^login/$', obtain_jwt_token),
    url(r'^verify-token/$', verify_jwt_token),
)

urlpatterns = format_suffix_patterns(urlpatterns)
