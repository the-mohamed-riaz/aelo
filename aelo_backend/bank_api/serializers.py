# from django.contrib.auth.models import User
from copy import error
from django.db.models import fields
from rest_framework import serializers

from bank_api.models import *


class Login_serializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50)


class Token_serializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    token = serializers.CharField()


class Get_option_serializer(serializers.Serializer):
    user = serializers.CharField(max_length=50)
    # cat_options = serializers.CharField()
    # token = serializers.CharField()
    # field_name = serializers.CharField()


class User_serializer(serializers.ModelSerializer):
    class Meta:
        models = User
        fields = "__all__"


class Get_options_output_serializer(serializers.ModelSerializer):
    user = User_serializer()
    cat_options = serializers.CharField(max_length=10000)

    class Meta:
        model = UserOptions
        fields = ['cat_options']


class Options_serializer(serializers.ModelSerializer):
    # user = User_serializer()
    # cat_options = serializers.CharField(max_length=10000)

    class Meta:
        model = UserOptions
        fields = "__all__"


class Post_option_serializer(serializers.Serializer):
    user = serializers.CharField(max_length=50)
    # token = serializers.CharField()
    # field_name = serializers.CharField()
    cat_options = serializers.CharField()

    def create(self, validated_data):
        try:
            username = User.objects.get(username=validated_data['user'])

        except:
            raise error("Invalid User in serializer")

        return UserOptions.objects.create(user=username, cat_options=validated_data['cat_options'])


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


class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        # fields = '__all__'
        fields = ['password', 'username', 'full_name', 'email', 'mobile']
