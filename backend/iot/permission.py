from rest_framework import permissions

from iot.models import Supervisor


class IsIot(permissions.BasePermission):
    def has_permission(self, request, view):
        if Supervisor.objects.filter(serial_number=request.META.get("HTTP_SERIAL_NUMBER")):
            return True
        return False
