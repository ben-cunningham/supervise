from django.conf.urls import url
import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = (
	url(r'^api/jobs/$', views.JobList.as_view()),
    url(r'^api/jobs/(?P<pk>[0-9]+)/$', views.JobDetail.as_view()),
	url(r'^api/estimators/(?P<pk>[0-9]+)/$', views.EstimatorDetail.as_view()),
	url(r'^api/estimators/$', views.EstimatorList.as_view()),
	url(r'^api/results/$', views.results_calculator.as_view()),
	url(r'^api/quotes/$', views.QuoteList.as_view()),
	url(r'^api/quotes/(?P<pk>[0-9]+)/$', views.QuoteDetail.as_view()),
	url(r'^api/houses/$', views.HouseList.as_view()),
	url(r'^api/houses/(?P<pk>[0-9]+)/$', views.HouseDetail.as_view()),
	url(r'^api/foreman/$', views.ForemanList.as_view()),
	url(r'^api/foreman/(?P<pk>[0-9]+)/$', views.ForemanDetail.as_view()),
	url(r'^api/login/$', 'rest_framework_jwt.views.obtain_jwt_token'),
	url(r'^api/verify-token/$', 'rest_framework_jwt.views.refresh_jwt_token'),
	url(r'^$', views.AppView.as_view(), name='index'),
	url(r'^login/$', views.LoginPageView.as_view(), name='login'),
)

urlpatterns = format_suffix_patterns(urlpatterns)
