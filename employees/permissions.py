from rest_framework import permissions
from models import Employee


class IsAdminPermission(permissions.BasePermission):
    """
    Permission to determine whether user is admin
    """

    def has_permission(self, request, view):

        employee = Employee.objects.get(user=request.user)
        return employee.is_admin
