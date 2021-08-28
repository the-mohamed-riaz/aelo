from django.db import models
from django.db.models import fields
from rest_framework.serializers import Serializer
from bank_api.models import *


class TestingSerializer(Serializer):
    class Meta():
        models = BankTranscations
        fields = "__all__"
