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
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from bank_api.models import *
from bank_api.serializers import *

# Create / register a new user


class User_registration(generics.CreateAPIView):
    permission_classes = []
    serializer_class = UserSerializer
    queryset = User.objects.all()

# creates default options when a user is registered with aelo


@receiver(post_save, sender=User)
def new_user_created(instance, created, **kwargs):
    if created:
        UserOptions.objects.create(
            cat_options="bike,food,family,fuel,medicine,public_transportation,repayment_of_loans,investments,cosmetics,wearables,smart_gadgets", user=instance)

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
        return Response("No user account exists", status=status.HTTP_404_NOT_FOUND)

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
        return Response("Invalid user", status=status.HTTP_401_UNAUTHORIZED)

# Getting user dropdowns


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
            username = User.objects.get(username=serial.data['user'])
            print('\n\nusername:  ', username)
        except:
            return Response("Invalid user", status=status.HTTP_401_UNAUTHORIZED)

        if username:
            query = UserOptions.objects.filter(
                user=username).values('cat_options')
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


class CategoryOptions(views.APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return UserOptions.objects.get(user=User.objects.get(pk))

    def get(self, request, format=None):
        data = request.query_params
        serial = Get_option_serializer(data=data)
        serial.is_valid(raise_exception=True)
        # clearConsole()
        print("serializer data: ", serial.data)
        try:
            username = User.objects.get(username=serial.data['user'])
            print('\n\nusername:  ', username)
        except:
            return Response("Invalid user", status=status.HTTP_401_UNAUTHORIZED)

        if username:
            query = UserOptions.objects.filter(
                user=username).values('cat_options')
            if query.exists():
                return Response(query[0]['cat_options'], status=status.HTTP_200_OK)
            else:
                query = "no user option available"
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
        user1 = User.objects.get(username=data.get('user'))
        print("user: ", user1)
        # print("\n\nall user objects:\n\n", UserOptions.objects.get())
        print("\n\none obj\n\n", UserOptions.objects.get(user=user1))
        options_obj = UserOptions.objects.get(user=user1)
        print("user object 1", options_obj)
        # options_obj.user = data.get("user", options_obj.user)
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
        datas['user'] = User.objects.all().filter(
            username=datas['username']).first()
        obj = BankTranscations.objects.create(
            user=datas['user'],
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

# Give list of transaction for authenticated user
# only get request allowed, takes user as input parameter


class User_trans_summary(generics.ListAPIView):
    serializer_class = User_trans_summary_serializer
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        r_user = self.request.query_params.get('username')
        user_obj = User.objects.get(username=r_user)
        print("\n\n User:", r_user, "\n\n id:", user_obj)
        queryset = BankTranscations.objects.all().filter(
            user=user_obj)
        return queryset


class User_recent_trans(generics.ListAPIView):
    serializer_class = User_trans_summary_serializer
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        r_user = self.request.query_params.get('username')
        user_obj = User.objects.get(username=r_user)
        queryset = BankTranscations.objects.all().filter(
            user=user_obj).order_by('-trans_date')[:5]
        for i in range(0, len(queryset)):
            parsed = queryset[i].__dict__['cat_of_trans'].replace("_", " ")
            queryset[i].__dict__['cat_of_trans'] = parsed[0].upper() + \
                parsed[1:].lower()
            # print("i: ", i, "\n ith query:", queryset[i].__dict__['cat_of_trans'])
        return queryset
