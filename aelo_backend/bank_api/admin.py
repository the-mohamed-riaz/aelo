from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

admin.site.register(User, UserAdmin)


@admin.register(BankTranscations)
class BankTransactions(admin.ModelAdmin):
    list_display = ('id', 'user', 'amount', 'type_of_trans', 'cat_of_trans',
                    'trans_hour', 'created', 'modified', 'payment_mode')
    list_filter = ('type_of_trans', 'cat_of_trans', 'created', 'payment_mode')
