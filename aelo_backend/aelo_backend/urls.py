from django.contrib import admin
from django.urls import path
from rest_framework.authtoken import views
from bank_api.views import *

# router = routers.SimpleRouter()
# router.register(r'testing', Testing)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', User_registration.as_view(), name='user registeration'),
    path('verify-token/', verify_token),
    path('login-token/', login_token),
    path('add/', Add_Trans.as_view(), name="Add new transaction"),
    path('delete/', Delete_Trans.as_view(), name="Delete a transaction"),
    path('edit/', Edit_Trans.as_view(), name="Edit a transaction"),
    path('history/', User_trans_summary.as_view(), name='testing'),
    path('options/', get_category_options, name='options'),
]

# urlpatterns += router.urls
