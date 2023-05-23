from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from workers.views import TaskDoneView, WorkersLogView, WorkerTaskCommentView

worker_router = routers.SimpleRouter()
worker_router.register(r'tasks', TaskDoneView, basename='tasks')
worker_router.register(r'logs', WorkersLogView, basename='logs')
worker_router.register(r'comment-task', WorkerTaskCommentView, basename='comment-task')

urlpatterns = [
    path('worker/', include(worker_router.urls)),
]
