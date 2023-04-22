from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from companies.views import CompanySinUpView

company_router = routers.SimpleRouter()
company_router.register(r'singup', CompanySinUpView, basename='singup')

urlpatterns = [
    path('company/', include(company_router.urls)),
]
