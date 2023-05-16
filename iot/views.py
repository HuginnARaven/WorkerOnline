from rest_framework import viewsets, mixins, generics
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from iot.models import Supervisor
from iot.serializers import SupervisorCompanySerializer, SupervisorOptionsSerializer, SendActivitySerializer, \
    WorkerPresenceLogSerializer
from permission.permission import IsCompany, IsIot
from workers.models import WorkerLogs


class SupervisorCompanyView(mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = Supervisor.objects.all()
    serializer_class = SupervisorCompanySerializer
    permission_classes = [IsAuthenticated, IsCompany, ]

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(company=self.request.user.id)


class SupervisorOptionsView(generics.RetrieveAPIView):
    queryset = Supervisor.objects.all()
    serializer_class = SupervisorOptionsSerializer
    permission_classes = [IsIot]

    def get_object(self):
        qs = super().get_queryset()
        return get_object_or_404(qs, serial_number=self.request.META.get("HTTP_SERIAL_NUMBER"))


class SupervisorActivityView(generics.UpdateAPIView):
    queryset = Supervisor.objects.all()
    serializer_class = SendActivitySerializer
    permission_classes = [IsIot]

    def get_object(self):
        qs = super().get_queryset()
        return get_object_or_404(qs, serial_number=self.request.META.get("HTTP_SERIAL_NUMBER"))


class WorkerPresenceLogView(generics.CreateAPIView):
    queryset = WorkerLogs.objects.all()
    serializer_class = WorkerPresenceLogSerializer
    permission_classes = [IsIot]
