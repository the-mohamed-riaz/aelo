# from django.contrib.auth.models import User
from rest_framework import serializers

from bank_api.models import *


class User_trans_summary_serializer(serializers.ModelSerializer):
    class Meta():
        model = BankTranscations
        fields = ['id', 'amount', 'type_of_trans', 'cat_of_trans',
                  'trans_date', 'trans_hour', 'payment_mode', 'user']


class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        # fields = '__all__'
        fields = ['password', 'username', 'first_name', 'last_name', 'email']
