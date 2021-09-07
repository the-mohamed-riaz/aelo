from decimal import Context
from rest_framework import generics,  status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.serializers import Serializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from bank_api.models import *
from bank_api.serializers import *
from django.contrib.auth.hashers import check_password


# Create / register a new user

class User_registration(generics.ListCreateAPIView):
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

# Adds new transaction


class Add_Trans(generics.CreateAPIView):
    serializer_class = Add_trans_serializer
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    # def get_queryset(self):
    #     r_user = self.request.query_params.get('user')
    #     user_obj = User.objects.filter(username=r_user).values('id')
    #     print("\n\n User:", r_user, "\n\n id:", user_obj)
    #     queryset = BankTranscations.objects.all().filter(
    #         user=user_obj[0]['id'])
    #     return queryset


# Give list of transaction for authenticated user
# only get request allowed, takes user as input parameter


class User_trans_summary(generics.ListAPIView):
    serializer_class = User_trans_summary_serializer
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        r_user = self.request.query_params.get('user')
        user_obj = User.objects.filter(username=r_user).values('id')
        print("\n\n User:", r_user, "\n\n id:", user_obj)
        queryset = BankTranscations.objects.all().filter(
            user=user_obj[0]['id'])
        return queryset
