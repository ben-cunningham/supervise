from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = (
    url(r'', views.invitation_view),
)

urlpatterns = format_suffix_patterns(urlpatterns)
