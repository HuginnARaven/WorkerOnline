from django.contrib import admin
from django.urls import path

from users.views import LogInView, LogOutView

urlpatterns = [
    path('login/', LogInView.as_view()),
    path('logout/', LogOutView.as_view()),
]
