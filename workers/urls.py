from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from workers.views import TaskDoneView

worker_router = routers.SimpleRouter()
worker_router.register(r'task-done', TaskDoneView, basename='task-done')

urlpatterns = [
    path('worker/', include(worker_router.urls)),
]
