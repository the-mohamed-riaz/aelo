from typing import Generic
from django.shortcuts import render
from rest_framework import generics
from bank_api.models import *

from bank_api.serializers import *
# Create your views here.


class Testing(generics.ListCreateAPIView):
    queryset = BankTranscations.objects().all()
    serializer_class = TestingSerializer
