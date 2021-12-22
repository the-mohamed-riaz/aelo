from django.contrib import admin
from django.urls import path
from rest_framework.authtoken import views
from bank_api.views import *

# router = routers.SimpleRouter()
# router.register(r'testing', Testing)

urlpatterns = [
    path('account-balance/', Account_balance.as_view(),
         name="get account balance"),
    path('add/', Add_Trans.as_view(), name="Add new transaction"),
    path('admin/', admin.site.urls),
    path('bank-details/', Bank_account_details.as_view(),
         name='Map user to bank name'),
    path('delete/', Delete_Trans.as_view(), name="Delete a transaction"),
    path('edit/', Edit_Trans.as_view(), name="Edit a transaction"),
    path('history/', User_trans_summary.as_view(),
         name='view all transaction of the user, requires username in parameter'),
    path('login-token/', login_token),
    path('options/', CategoryOptions.as_view(), name='options'),
    path('register/', User_registration.as_view(), name='user registeration'),
    path('recent/', User_recent_trans.as_view(), name='last 5 transaction'),
    path('tree-map/', Tree_chart_api.as_view(),
         name='gives data for tree map chart'),
    path('settings-page/', Setting_page.as_view(),
         name='gives users data'),
    path('verify-token/', verify_token),

    path('number-metrics/', Number_metrics.as_view(), name="Number metrics"),
    path('trans-chart/', Transaction_chart_api.as_view(),
         name="transaction chart data")
]

# urlpatterns += router.urls
