from django.contrib import admin
from django.urls import path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


from users.views import LogInView, LogOutView, ProfileView, ChangePasswordView

urlpatterns = [
    path('login/', LogInView.as_view()),
    path('logout/', LogOutView.as_view()),
    path('change_password/', ChangePasswordView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
