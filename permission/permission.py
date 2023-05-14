from rest_framework import permissions


class IsCompany(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'C':
            return True
        return False

    # def has_object_permission(self, request, view, obj):
    #     if obj.company.id == request.user.id:
    #         return True
    #     return False


class IsCompanyWorker(permissions.BasePermission):
    """
    Specifically for worker CRUD endpoint because in worker model company named employer
    """
    def has_permission(self, request, view):
        if request.user.role == 'C':
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.employer.id == request.user.id:
            return True
        return False


class IsWorker(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'W':
            return True
        return False


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'A':
            return True
        return False


class IsIot(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.META.get("HTTP_SERIAL_NUMBER") == obj.serial_number:
            return True
        return False