from django.db import models
from django.db.models.base import Model
from django.contrib.auth.models import User
from django.db.models.fields import BLANK_CHOICE_DASH
import datetime
from django.utils import timezone

# to get user bank balance:

# to get user spent traction:

# to get user received traction:


def get_defaults(val):
    if(val == 'hour'):
        return str(datetime.datetime.now)[11:13]
    elif(val == 'date'):
        return str(datetime.datetime.now)[:10]


class BankTranscations(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.PROTECT, blank=False, null=False)
    TRANS_CHOICE = [('debit', 'Income/Debit'), ('credit', 'Expence/Credit')]
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
    amout = models.DecimalField(
        verbose_name='Money/Amount in INR', blank=False, null=False, decimal_places=1, max_digits=20)
    type_of_trans = models.CharField(max_length=100,
                                     choices=TRANS_CHOICE, null=True, blank=True)
    cat_of_trans = models.CharField(max_length=200,
                                    choices=TRANS_CATEGORY, blank=True, null=True)
    trans_date = models.DateField(
        verbose_name="Transaction Date", default=get_defaults('date'), null=False, blank=False)
    trans_hour = models.IntegerField(
        blank=False, null=True,  verbose_name="Transaction Hour", default=get_defaults('hour'))
    created = models.DateTimeField(
        verbose_name="Timestamp of transaction entry", auto_now_add=True)
    modified = models.DateTimeField(
        verbose_name="Timestamp of transaction entry", auto_now=True)
    payment_mode = models.CharField(max_length=40,
                                    verbose_name="Payment Mode", choices=PAYMENT_MODES, null=False, blank=False)
