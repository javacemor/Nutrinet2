from django.urls import path
from .views import users_all, profile_details, account_settings, get_username

from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('auth', obtain_auth_token),
    path('profile_details/<token>', profile_details),
    path('account_settings/<token>', account_settings),
    path('get_username/<token>', get_username),
    path('', users_all),
]