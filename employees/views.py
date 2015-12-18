from django.shortcuts import render
from rest_framework import generics
from serializers import EstimatorSerializer, ForemanSerializer
from models import Estimator, Foreman

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
