from typing import Generic

from django.shortcuts import render
from rest_framework import generics, mixins, viewsets, status
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from bank_api.models import *
from bank_api.serializers import *

# class Testing(mixins.ListModelMixin, viewsets.GenericViewSet):
#     queryset = BankTranscations.objects.all()
#     serializer_class = TestingSerializer


class User_trans_summary(generics.ListAPIView):
    serializer_class = User_trans_summary_serializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        r_user = self.request.query_params.get('user')
        user_obj = User.objects.filter(username=r_user).values('id')
        print("\n\n User:", r_user, "\n\n id:", user_obj)
        queryset = BankTranscations.objects.all().filter(
            user=user_obj[0]['id'])
        return queryset


# @authentication_classes([])
# @permission_classes([])
@api_view(['POST'])
def login_view(request):
    serializer = Login_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    print("\n\nserialized data: ", serializer.data)
    # token = Token.objects.create(user=)
    content = serializer.data
    return Response(content, status=status.HTTP_200_OK)


class User_registration(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []
