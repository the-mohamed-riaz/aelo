import datetime
from decimal import Context

from django.contrib.auth.hashers import check_password
from django.db.models import query
from django.http.response import JsonResponse
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
            # return Response("IDK why I failed", status=status.HTTP_401_UNAUTHORIZED)

        if username:
            query = UserOptions.objects.filter(
                user=username).values('cat_options')
            print("\n\nquery full: ", query, "\n\n")
            print("\n\nquery full2: ", [query], "\n\n")
            print("\n\nquery full3: ", query.__dict__, "\n\n")
            # print("\n\nquery: ", query.__dict__, "\n\n")
            # resp = Get_options_output_serializer(data=query, many=True)
            # resp = Get_options_output_serializer(data=query)
            # return Response(f"{query.__dict__['cat_options']}", status=status.HTTP_200_OK)
            return Response(query[0]['cat_options'], status=status.HTTP_200_OK)
        # else:
            # return Response("Invalid user", status=status.HTTP_401_UNAUTHORIZED)

    # if request.method == 'PUT':
    #     serializer = Put_options_output_serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'POST':
        serializer = Post_option_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryOptions(views.APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return UserOptions.objects.get(user=User.objects.get(pk))

    def get(self, request, format=None):
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
            print("\n\nquery full: ", query, "\n\n")
            print("\n\nquery full2: ", [query], "\n\n")
            print("\n\nquery full3: ", query.__dict__, "\n\n")
            return Response(query[0]['cat_options'], status=status.HTTP_200_OK)

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

        #  pk = self.kwargs.get('user')
        # print("\n\n____PATCH____REQUEST____")
        # # req = request.query_params
        # # pk =
        # # print()
        # # print("\npk: \t", self.__dict__)
        # testmodel_object = self.get_object(pk)
        # print("\ntestmodeal: \t", testmodel_object)
        # # set partial=True to update a data partially
        # serializer = Options_serializer(
        #     testmodel_object, data=request.data, partial=True)
        # if serializer.is_valid():
        #     serializer.save()
        #     return JsonResponse(code=201, data=serializer.data)
        # return JsonResponse(code=400, data="wrong parameters")

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
