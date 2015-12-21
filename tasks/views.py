from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from models import Job, ResultsCalculator, Quote
from serializers import JobListSerializer, JobDetailSerializer, JobCreateSerializer, JobUpdateSerializer, QuoteListSerializer, QuoteDetailSerializer
from employees.models import Employee, Estimator, Foreman
from main.models import Team

class JobList(generics.ListCreateAPIView):

	def get_queryset(self):
		user = Employee.objects.get(user=self.request.user)
		employee = None
		team_pk = self.kwargs['team_pk']
		team = Team.objects.get(pk=team_pk)
		try:
			if(user.is_admin):
				return Jobs.objects.get(team=team)
		except:
			return None

		return Job.objects.filter(team=team).filter(foreman=employee)

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
