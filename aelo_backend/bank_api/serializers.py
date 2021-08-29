from django.db import models
from django.db.models import fields
from rest_framework import serializers
from bank_api.models import *
from django.contrib.auth.models import User


class TestingSerializer(serializers.ModelSerializer):
    class Meta():
        model = BankTranscations
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        # fields = '__all__'
        fields = ['password', 'username', 'first_name', 'last_name', 'email']
