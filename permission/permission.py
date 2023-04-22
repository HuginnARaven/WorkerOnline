from rest_framework import permissions


class IsCompany(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'C':
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.company.id == request.user.company.id:
            return True
        return False
