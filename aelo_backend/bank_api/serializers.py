# from django.contrib.auth.models import User
from rest_framework import serializers

from bank_api.models import *


class Login_serializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50)


class Token_serializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    token = serializers.CharField()


class User_trans_summary_serializer(serializers.ModelSerializer):
    class Meta():
        model = BankTranscations
        fields = ['id', 'amount', 'type_of_trans', 'cat_of_trans',
                  'trans_date', 'trans_hour', 'payment_mode', 'user']


class Add_trans_serializer(serializers.Serializer):
    username = serializers.CharField()
    amount = serializers.DecimalField(decimal_places=2, max_digits=20)
    type_of_trans = serializers.CharField()
    cat_of_trans = serializers.CharField()
    trans_date = serializers.CharField()
    trans_hour = serializers.CharField()
    payment_mode = serializers.CharField()

    def create(self, validated_data):
        validated_data['user'] = User.objects.all().filter(
            username=validated_data['username']).first()
        obj = BankTranscations.objects.create(
            user=validated_data['user'],
            amount=validated_data['amount'],
            type_of_trans=validated_data['type_of_trans'],
            cat_of_trans=validated_data['cat_of_trans'],
            trans_date=validated_data['trans_date'],
            trans_hour=validated_data['trans_hour'],
            payment_mode=validated_data['payment_mode'],
        )
        obj.save()
        return validated_data


class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        # fields = '__all__'
        fields = ['password', 'username', 'first_name', 'last_name', 'email']
