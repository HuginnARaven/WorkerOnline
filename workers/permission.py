from rest_framework import permissions


class IsWorker(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'W':
            return True
        return False

