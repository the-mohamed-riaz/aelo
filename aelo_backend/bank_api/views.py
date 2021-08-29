from typing import Generic
from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from bank_api.models import *
from django.contrib.auth.models import User
from bank_api.serializers import *
# Create your views here.


# class Testing(mixins.ListModelMixin, viewsets.GenericViewSet):
#     queryset = BankTranscations.objects.all()
#     serializer_class = TestingSerializer

class Testing(generics.ListCreateAPIView):
    # queryset = BankTranscations.objects.all()
    serializer_class = TestingSerializer
    permission_classes = []

    def get(self, request, *args, **kwargs):
        print("\n\nrequest: ", request)
        request = User.objects.all()
        return self.list(request, *args, **kwargs)


class User_registration(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []
