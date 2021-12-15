# from django.contrib.auth.models import User
from copy import error
from django.db.models import fields
from rest_framework import serializers, status
from rest_framework.response import Response

from bank_api.models import *


class Tree_chart_serializer(serializers.ModelSerializer):
    class Meta:
        model = BankTranscations
        fields = "__all__"


class Login_serializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50)


class Token_serializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    token = serializers.CharField()


class Get_option_serializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    # cat_options = serializers.CharField()
    # token = serializers.CharField()
    # field_name = serializers.CharField()


class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class Username_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class Bank_details_serializer(serializers.ModelSerializer):
    # username = serializers.CharField()
    # username = Username_serializer()
    # bank_name = serializers.CharField()

    class Meta:
        model = BankDetails
        fields = "__all__"
        # fields = ['bank_name']

    def create(self, validated_data):
        try:
            username = User.objects.get(username=validated_data['username'])
        except:
            raise error("Invalid User in serializer")

        # try:
        #     bk_name = BankDetails.objects.filter(username=username)

        # except:
        #     return Response("No bank account linked", status=status.HTTP_204_NO_CONTENT)

        return BankDetails.objects.create(username=username, bank_name=validated_data['bank_name'])


class Req_username_serializer(serializers.ModelSerializer):
    username = models.CharField()
    bank_name = models.CharField()

    class Meta:
        model = BankDetails
        fields = ['username']


class Account_balance_serializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField()

    class Meta:
        model = AccountBalance
        fields = ['username', 'bank_name', 'account_balance', 'timestamp']


class Get_options_output_serializer(serializers.ModelSerializer):
    username = User_serializer()
    cat_options = serializers.CharField(max_length=10000)

    class Meta:
        model = UserOptions
        fields = ['cat_options']


class Options_serializer(serializers.ModelSerializer):
    # username = User_serializer()
    # cat_options = serializers.CharField(max_length=10000)

    class Meta:
        model = UserOptions
        fields = "__all__"


class Post_option_serializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    # token = serializers.CharField()
    # field_name = serializers.CharField()
    cat_options = serializers.CharField()

    def create(self, validated_data):
        try:
            username = User.objects.get(username=validated_data['username'])

        except:
            raise error("Invalid User in serializer")

        return UserOptions.objects.create(username=username, cat_options=validated_data['cat_options'])


class User_trans_summary_serializer(serializers.ModelSerializer):
    class Meta():
        model = BankTranscations
        fields = ['id', 'amount', 'comment', 'type_of_trans', 'cat_of_trans',
                  'trans_date', 'trans_hour', 'payment_mode', 'username']


class Add_trans_serializer(serializers.Serializer):
    username = serializers.CharField()
    comment = serializers.CharField()
    amount = serializers.DecimalField(decimal_places=2, max_digits=20)
    type_of_trans = serializers.CharField()
    cat_of_trans = serializers.CharField()
    trans_date = serializers.CharField()
    trans_hour = serializers.CharField()
    payment_mode = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        # fields = '__all__'
        fields = ['password', 'username', 'full_name', 'email', 'mobile']
