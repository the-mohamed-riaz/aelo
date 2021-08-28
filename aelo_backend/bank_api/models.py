from django.db import models
from django.db.models.base import Model
from django.contrib.auth.models import User
from django.db.models.fields import BLANK_CHOICE_DASH
import datetime
from django.utils import timezone

# to get user bank balance:

# to get user spent traction:

# to get user received traction:

"""
amt, 
type(debit{add}, credit{sub}),
2nd_party_name(sender/receiver),
category_of_transcation({family,friends,food,outings,medicines,travel,maintenance,rent,bills,tax,shopping,repaying_debts,investment,luxury,purchase,miscellaneous,pets,games,charity_works,gifts,icome}),
transfer_date, transfer_time, time_stamp
type_of_payment{cash,upi,bank_transfer,voucher,Check,Others,miscellaneous}, upi:{gpay,paytm,amazon_pay,phone_pay,Others}
"""


def get_current_hour():
    return int(datetime.datetime.now().hour())


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
        ('Purchase', ('vehicle', ('bike', 'Bike'), ('car', 'Car'),
         ('cycle', 'Cycle'), ('other', 'Others'))),
        ('pets', 'Pets'),
        ('games', 'Games'),
        ('charity_works', 'Charity works'),
        ('gifts', 'Gifts'), ('income', 'Income')
    ]
    PAYMENT_MODES = ['Cash', 'UPI', 'Bank transfer', 'Vouchers',
                     'Cheque', 'Others', 'Cash backs', 'Miscellaneous']
    amout = models.DecimalField(
        verbose_name='Money/Amount in INR', blank=False, null=False, decimal_places=1, max_digits=20)
    type_of_trans = models.CharField(
        choices=TRANS_CHOICE, null=True, blank=True)
    cat_of_trans = models.CharField(
        choices=TRANS_CATEGORY, blank=True, null=True)
    trans_date = models.DateField(
        verbose_name="Transaction Date", default=timezone.now().date, null=False, blank=False)
    trans_hour = models.IntegerField(
        blank=False, null=True,  verbose_name="Transaction Hour", default=get_current_hour)
    created = models.DateTimeField(
        verbose_name="Timestamp of transaction entry", auto_now_add=True)
    modified = models.DateTimeField(
        verbose_name="Timestamp of transaction entry", auto_now=True)
    payment_mode = models.CharField(
        verbose_name="Payment Mode", choices=PAYMENT_MODES, null=False, blank=False)
