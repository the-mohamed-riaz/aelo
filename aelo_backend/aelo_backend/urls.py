from django.contrib import admin
from django.urls import path
from rest_framework import routers
from bank_api.views import *

# router = routers.SimpleRouter()
# router.register(r'testing', Testing)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', User_registration.as_view(), name='user registeration'),
    path('testing/', User_trans_summary.as_view(), name='testing'),
]

# urlpatterns += router.urls
