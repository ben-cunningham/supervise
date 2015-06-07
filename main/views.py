from models import Job, Estimator, ResultsCalculator
from serializers import JobSerializer, EstimatorSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class EstimatorList(generics.ListCreateAPIView):
	queryset = Estimator.objects.all()
	serializer_class = EstimatorSerializer
	
	
class EstimatorDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Estimator.objects.all()
	serializer_class = EstimatorSerializer


class JobList(generics.ListCreateAPIView):
	queryset = Job.objects.all()
	serializer_class = JobSerializer


class JobDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Job.objects.all()
	serializer_class = JobSerializer


class results_calculator(APIView):

    def get(self, request, *args, **kw):
        results_calculator = ResultsCalculator()
        result = results_calculator.jobTotals()
        response = Response(result, status=status.HTTP_200_OK)
        return response