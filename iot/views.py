from rest_framework import viewsets, mixins, generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from companies.permission import IsCompany
from iot.models import Supervisor, Offer
from iot.permission import IsIot
from iot.serializers import SupervisorCompanySerializer, SupervisorOptionsSerializer, SendActivitySerializer, \
    WorkerPresenceLogSerializer, OfferSerializer, SupervisorServerTimeSerializer

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
        return get_object_or_404(qs, serial_number=self.request.META.get("HTTP_SERIAL_NUMBER"), worker__isnull=False)


class ServerTimeView(generics.RetrieveAPIView):
    queryset = Supervisor.objects.all()
    serializer_class = SupervisorServerTimeSerializer
    permission_classes = [IsIot]

    def get_object(self):
        qs = super().get_queryset()
        return get_object_or_404(qs, serial_number=self.request.META.get("HTTP_SERIAL_NUMBER"), worker__isnull=False)


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


class OfferCompanyView(viewsets.ModelViewSet, GenericViewSet):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticated, IsCompany, ]

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.status in ['DL', 'CM']:
            return Response(data={'status': ['You can not delete offer at this stage!']},
                            status=status.HTTP_400_BAD_REQUEST)
        self.perform_destroy(obj)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        print(self.request.user)
        qs = super().get_queryset()
        return qs.filter(company=self.request.user.id)
