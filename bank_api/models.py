import datetime
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.base import Model
from django.utils import timezone
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class User(AbstractUser):
    password = models.CharField(max_length=1281)
    last_login = models.DateTimeField(
        blank=True, null=True, auto_now=True, auto_now_add=False)
    is_superuser = models.BooleanField(blank=False, default=False, null=False)
    username = models.CharField(unique=True, max_length=150, primary_key=True)
    full_name = models.CharField(max_length=150, blank=False, null=False)
    email = models.CharField(max_length=254, unique=True)
    is_staff = models.BooleanField(blank=False, default=False, null=False)
    is_active = models.BooleanField(blank=False, default=True, null=False)
    mobile = models.IntegerField(blank=True, null=True, default=None)
    date_joined = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(unique=True, auto_created=True,
                          default=uuid.uuid4, editable=False)

    class Meta:
        db_table = 'user_details'
        ordering = ['username']

    # def __str__(self):
    #     return self.username


class BankDetails(models.Model):
    username = models.ForeignKey(
        User, on_delete=models.PROTECT, blank=False, null=False)
    bank_name = models.CharField(
        max_length=40, null=False, blank=False, editable=True)

    class Meta:
        db_table = 'user_bank_details'
        ordering = ['username']

    def __str__(self):
        return self.bank_name


class AccountBalance(models.Model):
    username = models.ForeignKey(User, on_delete=models.PROTECT)
    bank_name = models.CharField(max_length=70)
    account_balance = models.DecimalField(
        max_digits=25, decimal_places=2)
    timestamp = models.DateTimeField(
        auto_now_add=True, primary_key=True)

    class Meta:
        db_table = 'user_account_balance'
        ordering = ['timestamp']


class UserOptions(models.Model):
    username = models.OneToOneField(
        User, on_delete=models.CASCADE, blank=False, null=False, primary_key=True)
    cat_options = models.CharField(
        blank=False, null=False, max_length=100000, default="family,food,fuel,loan,smart_phone")

    class Meta:
        db_table = 'user_category_option'
        ordering = ['username']


class BankTranscations(models.Model):
    id = models.UUIDField(unique=True, auto_created=True, default=uuid.uuid4,
                          editable=False, primary_key=True)
    username = models.ForeignKey(
        User, on_delete=models.PROTECT, blank=False, null=False)
    amount = models.DecimalField(
        verbose_name='Money/Amount in INR', blank=False, null=False, decimal_places=3, max_digits=19)
    type_of_trans = models.CharField(max_length=100, null=True, blank=True)
    comment = models.CharField(max_length=30, null=True, blank=True)
    cat_of_trans = models.CharField(max_length=200, blank=True, null=True)
    trans_date = models.DateField(
        verbose_name="Transaction Date", null=True, blank=False)
    trans_hour = models.CharField(max_length=6,
                                  blank=False, null=True,  verbose_name="Transaction Hour")
    created = models.DateTimeField(
        verbose_name="Timestamp of transaction entry", auto_now_add=True)
    modified = models.DateTimeField(
        verbose_name="Timestamp of transaction entry", auto_now=True)
    payment_mode = models.CharField(max_length=40,
                                    verbose_name="Payment Mode", null=False, blank=False)

    class Meta:
        db_table = 'user_transaction'
        ordering = ['modified']
