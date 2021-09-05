from typing import Generic
from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from bank_api.models import *
from bank_api.serializers import *

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

# class Testing(mixins.ListModelMixin, viewsets.GenericViewSet):
#     queryset = BankTranscations.objects.all()
#     serializer_class = TestingSerializer


class User_trans_summary(generics.ListAPIView):
    serializer_class = User_trans_summary_serializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        r_user = self.request.query_params.get('user')
        user_obj = User.objects.filter(username=r_user).values('id')
        print("\n\n User:", r_user, "\n\n id:", user_obj)
        queryset = BankTranscations.objects.all().filter(
            user=user_obj[0]['id'])
        return queryset


class User_registration(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []
