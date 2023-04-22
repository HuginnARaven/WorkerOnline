from django.shortcuts import render
from rest_framework import generics, viewsets, status, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from permission.permission import IsCompany
from workers.models import Worker
from workers.serializers import WorkerSerializer


class WorkerSinUpView(mixins.CreateModelMixin, GenericViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer
    permission_classes = [IsAuthenticated, IsCompany, ]
