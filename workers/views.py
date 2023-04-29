from django.shortcuts import render
from rest_framework import generics, viewsets, status, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from permission.permission import IsWorker
from workers.models import WorkersTasks
from workers.serializers import TaskDoneSerializer


class TaskDoneView(mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.ListModelMixin, GenericViewSet):
    queryset = WorkersTasks.objects.all()
    serializer_class = TaskDoneSerializer
    permission_classes = [IsAuthenticated, IsWorker, ]

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(worker_appointed=self.request.user.id, )
