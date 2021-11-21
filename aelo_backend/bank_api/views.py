import datetime
from decimal import Context

from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
from rest_framework import generics, status, views
from rest_framework.authentication import (
    BasicAuthentication, TokenAuthentication)
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from bank_api.models import *
from bank_api.serializers import *
# Create / register a new user


class User_registration(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []

# Generate token to user / user login


@api_view(['POST'])
def login_token(request):
    data = request.data
    serializer = Login_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    try:
        req_username = data['username']
        req_password = data['password']
    except:
        return Response("Include username and password field in the request", status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(username=req_username)
    except:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    true_pass = User.objects.all().filter(
        username=req_username).values('password')[0]['password']

    if(true_pass != req_password):
        return Response("Please enter a valid password!", status=status.HTTP_401_UNAUTHORIZED)

    user_token = Token.objects.get_or_create(user=user)
    resp = {'token': str(user_token[0]), 'username': req_username}
    output_serializer = Token_serializer(data=resp)
    output_serializer.is_valid(raise_exception=True)
    return Response(output_serializer.validated_data, status=status.HTTP_200_OK)

# verify token


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def verify_token(request):
    data = request.data
    serial = Token_serializer(data=data)
    serial.is_valid(raise_exception=True)
    try:
        username = User.objects.get(username=data['username'])
        print("\n\nUsername: ", username, "\n\n")
    except:
        return Response("why failed", status=status.HTTP_401_UNAUTHORIZED)

    if username:
        return Response(True, status=status.HTTP_200_OK)
    else:
        return Response("Invalid user", status=status.HTTP_401_UNAUTHORIZED)

# Adds new transaction


class Add_Trans(views.APIView):
    authentication_classes = [TokenAuthentication,  BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = Add_trans_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        datas = serializer.validated_data
        datas['user'] = User.objects.all().filter(
            username=datas['username']).first()
        obj = BankTranscations.objects.create(
            user=datas['user'],
            amount=datas['amount'],
            type_of_trans=datas['type_of_trans'],
            cat_of_trans=datas['cat_of_trans'],
            trans_date=datas['trans_date'],
            trans_hour=datas['trans_hour'],
            payment_mode=datas['payment_mode'],
        )
        obj.save()
        print("\n\ndict:", obj.__dict__)
        return Response(obj.__dict__['id'], status.HTTP_201_CREATED)

# should be authenticated to delete trans


class Delete_Trans(views.APIView):
    authentication_classes = [TokenAuthentication,  BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        trans_id = request.data['trans_id']
        BankTranscations.objects.filter(id=trans_id).delete()
        return Response('Deleted', status.HTTP_200_OK)


class Edit_Trans(views.APIView):
    authentication_classes = [TokenAuthentication,  BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        trans_id = request.data['trans_id']
        try:
            saved_trans = BankTranscations.objects.get(id=trans_id)
        except:
            return Response("Invalid transaction id", status.HTTP_400_BAD_REQUEST)
        serializer = User_trans_summary_serializer(
            instance=saved_trans, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            saved_trans = serializer.save()
        _data = serializer.data
        return Response(_data, status.HTTP_200_OK)

# Give list of transaction for authenticated user
# only get request allowed, takes user as input parameter


class User_trans_summary(generics.ListAPIView):
    serializer_class = User_trans_summary_serializer
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        r_user = self.request.query_params.get('user_id')
        user_obj = User.objects.filter(username=r_user).values('id')
        print("\n\n User:", r_user, "\n\n id:", user_obj)
        queryset = BankTranscations.objects.all().filter(
            user=user_obj[0]['id'])
        return queryset
