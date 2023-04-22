from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from workers.views import WorkerSinUpView

worker_router = routers.SimpleRouter()
worker_router.register(r'singup', WorkerSinUpView, basename='singup')

urlpatterns = [
    path('worker/', include(worker_router.urls)),
]
