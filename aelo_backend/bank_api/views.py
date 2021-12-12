import datetime
import os
from decimal import Context

from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import Group, User
from django.db.models import query
from django.db.models.aggregates import Count
from django.db.models.expressions import F
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics, status, views
from rest_framework.authentication import (BasicAuthentication,
                                           TokenAuthentication)
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from bank_api.models import *
from bank_api.serializers import *

# Create / register a new username


class User_registration(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# creates default options when a username is registered with aelo

@receiver(post_save, sender=User)
def new_user_created(instance, created, **kwargs):
    if created:
        UserOptions.objects.create(
            cat_options="bike,food,family,fuel,medicine,public_transportation,repayment_of_loans,investments,cosmetics,wearables,smart_gadgets", username=instance)


# Generate token to username / username login

@receiver(post_save, sender=BankTranscations)
def new_bank_balance(instance, created, **kwargs):
    if created:
        print("\n------ ------ -------\nnew transaction instance: ", instance)
        bk = BankDetails.objects.get(username)
        slz = User_trans_summary_serializer(instance=instance)
        data = slz.data
        AccountBalance.objects.create(username=data.username)


@api_view(['POST'])
def login_token(request):
    serializer = Login_serializer(data=request.data)
    try:
        serializer.is_valid(raise_exception=True)
        req = {'username': serializer.data['username'],
               'password': serializer.data['password']}
    except:
        return Response("Include username and password field in the request", status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(username=req['username'])
    except:
        return Response("Invalid user", status=status.HTTP_404_NOT_FOUND)
    true_pass = User.objects.filter(
        username=req['username']).values('password')[0]['password']

    if(true_pass != req['password']):
        return Response("Please enter a valid password!", status=status.HTTP_401_UNAUTHORIZED)

    user_token = Token.objects.get_or_create(user=req['username'])
    resp = {'token': str(user_token[0]), 'username': req['username']}
    output_serializer = Token_serializer(data=resp)
    output_serializer.is_valid(raise_exception=True)
    return Response(output_serializer.validated_data, status=status.HTTP_200_OK)


# verify token


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def verify_token(request):
    data = request.query_params
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
        return Response("Invalid username", status=status.HTTP_401_UNAUTHORIZED)

# Getting username dropdowns


@api_view(['GET', 'POST', 'PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_category_options(request):
    # if request.method == 'GET':
    if request.method == 'GET':
        data = request.query_params
        serial = Get_option_serializer(data=data)
        serial.is_valid(raise_exception=True)
        print("serializer data: ", serial.data)
        try:
            username = User.objects.get(username=serial.data['username'])
            print('\n\nusername:  ', username)
        except:
            return Response("Invalid username", status=status.HTTP_401_UNAUTHORIZED)

        if username:
            query = UserOptions.objects.filter(
                username=username).values('cat_options')
            # covert_options_case(query[0]['cat_options'])
            return Response(query[0]['cat_options'], status=status.HTTP_200_OK)

    if request.method == 'POST':
        serializer = Post_option_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def covert_options_case(value):
    print("\n\n", value)
    for i in value:
        print(i)


def clearConsole(): return os.system(
    'cls' if os.name in ('nt', 'dos') else 'clear')


class Account_balance(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        req = request.query_params
        req_serial = Get_ac_serializer(data=req)
        req_serial.is_valid(raise_exception=True)
        username = req['username']
        try:
            queryset = AccountBalance.objects.filter(username=username)
            if(len(queryset) < 1):
                return Response("Add bank details", status=status.HTTP_204_NO_CONTENT)
        except:
            return Response("Invalid user", status=status.HTTP_400_BAD_REQUEST)
        return Response(queryset, status=status.HTTP_200_OK)


class CategoryOptions(views.APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return UserOptions.objects.get(username=User.objects.get(pk))

    def get(self, request, format=None):
        data = request.query_params
        serial = Get_option_serializer(data=data)
        serial.is_valid(raise_exception=True)
        # clearConsole()
        print("serializer data: ", serial.data)
        try:
            username = User.objects.get(username=serial.data['username'])
            print('\n\nusername:  ', username)
        except:
            return Response("Invalid username", status=status.HTTP_401_UNAUTHORIZED)

        if username:
            query = UserOptions.objects.filter(
                username=username).values('cat_options')
            if query.exists():
                return Response(query[0]['cat_options'], status=status.HTTP_200_OK)
            else:
                query = "no username option available"
                return Response(query, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = Post_option_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        data = request.data
        print("\n\nrequest datas:\n", data)
        user1 = User.objects.get(username=data.get('username'))
        print("username: ", user1)
        # print("\n\nall username objects:\n\n", UserOptions.objects.get())
        print("\n\none obj\n\n", UserOptions.objects.get(username=user1))
        options_obj = UserOptions.objects.get(username=user1)
        print("username object 1", options_obj)
        # options_obj.username = data.get("username", options_obj.username)
        options_obj.cat_options = data.get(
            "cat_options", options_obj.cat_options)
        options_obj.save()
        serializer = Options_serializer(options_obj)
        return Response(serializer.data)


class Tree_chart_api(views.APIView):
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = Tree_chart_serializer
        fieldname = 'cat_of_trans'
        queryset = BankTranscations.objects.values(x=F(fieldname)).order_by(
            fieldname).annotate(y=Count(fieldname))
        for i in range(0, len(queryset)):
            parsed = queryset[i]['x'].replace("_", " ")
            queryset[i]['x'] = parsed[0].upper() + parsed[1:].lower()
        return Response(queryset, status=status.HTTP_200_OK)


class Add_Trans(views.APIView):
    authentication_classes = [TokenAuthentication,  BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = Add_trans_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        datas = serializer.validated_data
        print("\n\nserialized data:\n", serializer.data)
        datas['username'] = User.objects.all().filter(
            username=datas['username']).first()
        obj = BankTranscations.objects.create(
            username=datas['username'],
            comment=datas['comment'],
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

# Give list of transaction for authenticated username
# only get request allowed, takes username as input parameter


class User_trans_summary(generics.ListAPIView):
    serializer_class = User_trans_summary_serializer
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        r_user = self.request.query_params.get('username')
        user_obj = User.objects.get(username=r_user)
        print("\n\n User:", r_user, "\n\n id:", user_obj)
        queryset = BankTranscations.objects.all().filter(
            username=user_obj)
        return queryset


class User_recent_trans(generics.ListAPIView):
    serializer_class = User_trans_summary_serializer
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        r_user = self.request.query_params.get('username')
        user_obj = User.objects.get(username=r_user)
        queryset = BankTranscations.objects.all().filter(
            username=user_obj).order_by('-trans_date')[:5]
        for i in range(0, len(queryset)):
            parsed = queryset[i].__dict__['cat_of_trans'].replace("_", " ")
            queryset[i].__dict__['cat_of_trans'] = parsed[0].upper() + \
                parsed[1:].lower()
            # print("i: ", i, "\n ith query:", queryset[i].__dict__['cat_of_trans'])
        return queryset
