from models import Job, Estimator, ResultsCalculator, Quote, House, Foreman, Employee
from serializers import JobListSerializer, JobDetailSerializer, JobCreateSerializer, JobUpdateSerializer, EstimatorSerializer, QuoteListSerializer, QuoteDetailSerializer, HouseSerializer, ForemanSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.generic.base import TemplateView
from django.shortcuts import redirect

class AppView(TemplateView):
	template_name = 'index.html'

class LoginPageView(TemplateView):
	template_name = 'login.html'

class HouseList(generics.ListCreateAPIView):
	queryset = House.objects.all()
	serializer_class = HouseSerializer

class HouseDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = House.objects.all()
	serializer_class = HouseSerializer

class EstimatorList(generics.ListCreateAPIView):
	queryset = Estimator.objects.all()
	serializer_class = EstimatorSerializer

class EstimatorDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Estimator.objects.all()
	serializer_class = EstimatorSerializer

class ForemanList(generics.ListCreateAPIView):
	queryset = Foreman.objects.all()
	serializer_class = ForemanSerializer

class ForemanDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Foreman.objects.all()
	serializer_class = ForemanSerializer

class JobList(generics.ListCreateAPIView):
	def get_queryset(self):
		user = Employee.objects.get(user=self.request.user)
		employee = None
		try:
			if(user.is_admin):
				employee = Estimator.objects.get(user=self.request.user)
			else:
				employee = Foreman.objects.get(user=self.request.user)
		except:
			return None

		if(employee.is_admin == True):
			return Job.objects.all()
		else:
			return Job.objects.filter(foreman=employee)

	def get_serializer_class(self):
		if self.request.method == 'GET':
			return JobListSerializer
		else:
			return JobCreateSerializer

class JobDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Job.objects.all()
	serializer_class = JobDetailSerializer

	def get_serializer_class(self):
		if self.request.method == 'PUT':
			return JobUpdateSerializer
		else:
			return JobDetailSerializer

class QuoteList(generics.ListCreateAPIView):
	queryset = Quote.objects.all()
	serializer_class = QuoteListSerializer

class QuoteDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Quote.objects.all()
	serializer_class = QuoteDetailSerializer

class results_calculator(APIView):
    def get(self, request, *args, **kw):
        results_calculator = ResultsCalculator()
        result = results_calculator.jobTotals()
        response = Response(result, status=status.HTTP_200_OK)
        return response
