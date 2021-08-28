from django.db import models
from django.db.models.base import Model
from django.contrib.auth.models import User
import datetime

from django.db.models.fields import BLANK_CHOICE_DASH

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


class BankTranscations(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.PROTECT, blank=False, null=False)
    TRANS_CHOICE = ['Income', 'Expence']
    RECIPIENT_CATEGORY = ['Family', 'Friends', 'Food', 'Outings', 'Medical', 'Travel', 'Rent', 'Bills', 'Maintenance', 'Tax',
                          'Shopping', 'Repayment', 'Investment', 'Luxury', 'Purchase', 'Pets', 'Games', 'Charity works', 'Gifts', 'Income', 'Loan']
    PAYMENT_MODES = ['Cash', 'UPI', 'Bank transfer', 'Vouchers',
                     'Cheque', 'Others', 'Cash backs', 'Miscellaneous']
    amout = models.DecimalField(
        verbose_name='Money/Amount in INR', blank=False, null=False)
    type_of_trans = models.CharField(
        choices=TRANS_CHOICE, null=True, blank=True)
    cat_of_trans = models.CharField(
        choices=RECIPIENT_CATEGORY, blank=True, null=True)
    trans_date = models.DateField(
        verbose_name="Transaction Date", default=datetime.datetime.now().date(), null=False, blank=False)
    trans_hour = models.IntegerField(max_length=2, blank=False, null=True,
                                     verbose_name="Transaction Hour", default=datetime.datetime.now().hour())
    created = models.DateTimeField(
        verbose_name="Timestamp of transaction entry", auto_now_add=True)
    modified = models.DateTimeField(
        verbose_name="Timestamp of transaction entry", auto_now=True)
    payment_mode = models.CharField(
        verbose_name="Payment Mode", choices=PAYMENT_MODES, null=False, blank=False)
