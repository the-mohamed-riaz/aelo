import datetime
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.base import Model
from django.utils import timezone

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


class User(AbstractUser):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField(blank=False, default=True, null=False)
    username = models.CharField(unique=True, max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField(blank=False, default=True, null=False)
    is_active = models.BooleanField(blank=False, default=True, null=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=150)
    id = models.UUIDField(unique=True, auto_created=True, default=uuid.uuid4,
                          editable=False, primary_key=True)

    class Meta:
        db_table = 'auth_user'


class BankTranscations(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.PROTECT, blank=False, null=False)
    TRANS_CHOICE = [('debit', 'Expense/Debit'), ('credit', 'Income/Credit')]
    TRANS_CATEGORY = [
        ('family', 'Family'),
        ('friends', 'Friends'),
        ('food', (('healthy', 'Healthy'), ('outdoor', 'Outdoor'))),
        ('outings', 'Outings'),
        ('medical', 'Medical'),
        ('travel', 'Travel'),
        ('rent', (('house', 'House Rent'), ('pg', 'PG rent'), ('others', 'others'))),
        ('bills', (('electric Bill', 'Electric Bill'),
         ('phone_bill', 'Phone Bill'), ('water_bill', 'Water Bill'))),
        ('maintenance', (('bike', 'Bike'), ('home', 'Home'),
         ('personal_gromming', 'Personal Gromming'))),
        ('tax', 'Tax'),
        ('shopping', (('gadgets', 'Gadgets'), ('appliances', 'Appliances'),
         ('grocceries', 'Groceries'), ('cloths', 'Cloths'), ('jewellery', 'Jewellery'))),
        ('Repayment', (('loan', 'Loan'), ('emi', 'EMI'))),
        ('investment', 'Investment'),
        ('Purchase', (('bike', 'Bike'), ('car', 'Car'),
         ('cycle', 'Cycle'), ('other', 'Others'))),
        ('pets', 'Pets'),
        ('games', 'Games'),
        ('charity_works', 'Charity works'),
        ('gifts', 'Gifts'), ('income', 'Income')
    ]
    PAYMENT_MODES = [('cash', 'Cash'), ('upi', 'UPI'), ('bank_transfer', 'Bank transfer'), ('vouchers', 'Vouchers'),
                     ('cheque', 'Cheque'), ('others', 'Others'), ('cash_backs', 'Cash backs'), ('miscellaneous', 'Miscellaneous')]
    amount = models.DecimalField(
        verbose_name='Money/Amount in INR', blank=False, null=False, decimal_places=1, max_digits=20)
    type_of_trans = models.CharField(max_length=100,
                                     choices=TRANS_CHOICE, null=True, blank=True)
    cat_of_trans = models.CharField(max_length=200,
                                    choices=TRANS_CATEGORY, blank=True, null=True)
    trans_date = models.DateField(
        verbose_name="Transaction Date", default=get_defaults('date'), null=True, blank=False)
    trans_hour = models.IntegerField(
        blank=False, null=True,  verbose_name="Transaction Hour", default=get_defaults('hour'))
    created = models.DateTimeField(
        verbose_name="Timestamp of transaction entry", auto_now_add=True)
    modified = models.DateTimeField(
        verbose_name="Timestamp of transaction entry", auto_now=True)
    payment_mode = models.CharField(max_length=40,
                                    verbose_name="Payment Mode", choices=PAYMENT_MODES, null=False, blank=False)
