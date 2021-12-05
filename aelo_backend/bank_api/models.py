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

# to get user bank balance:

# to get user spent traction:

# to get user received traction:


def get_defaults(val):
    if(val == 'hour'):
        # print("Current time: ", str(str(datetime.datetime.now)[11:13]))
        return str(str(datetime.datetime.now())[11:13])
    elif(val == 'date'):
        # print("Current date: ", str(str(datetime.datetime.now)[:10]))
        return str(str(datetime.datetime.now())[:10])


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class User(AbstractUser):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField(blank=False, default=False, null=False)
    username = models.CharField(unique=True, max_length=150, primary_key=True)
    full_name = models.CharField(max_length=150, blank=False, null=False)
    # last_name = models.CharField(max_length=150, blank=True, null=True)
    email = models.CharField(max_length=254, unique=True)
    is_staff = models.BooleanField(blank=False, default=False, null=False)
    is_active = models.BooleanField(blank=False, default=True, null=False)
    mobile = models.IntegerField(blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(unique=True, auto_created=True,
                          default=uuid.uuid4, editable=False)

    class Meta:
        db_table = 'auth_user'

    def __str__(self):
        return self.username


class UserOptions(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, blank=False, null=False, primary_key=True)
    cat_options = models.CharField(blank=True, null=True, max_length=10000)

    class Meta:
        db_table = 'user_option_category'


class BankTranscations(models.Model):
    id = models.UUIDField(unique=True, auto_created=True, default=uuid.uuid4,
                          editable=False, primary_key=True)
    user = models.ForeignKey(
        User, on_delete=models.PROTECT, blank=False, null=False)
    TRANS_CHOICE = [('debit', 'Expense/Debit'), ('credit', 'Income/Credit')]
    PAYMENT_MODES = [('cash', 'Cash'), ('upi', 'UPI'), ('bank_transfer', 'Bank transfer'), ('vouchers', 'Vouchers'),
                     ('cheque', 'Cheque'), ('others', 'Others'), ('cash_backs', 'Cash backs'), ('miscellaneous', 'Miscellaneous')]
    amount = models.DecimalField(
        verbose_name='Money/Amount in INR', blank=False, null=False, decimal_places=3, max_digits=19)
    type_of_trans = models.CharField(max_length=100,
                                     choices=TRANS_CHOICE, null=True, blank=True)
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
                                    verbose_name="Payment Mode", choices=PAYMENT_MODES, null=False, blank=False)
