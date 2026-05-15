from rest_framework.permissions import BasePermission


class IsEducatorOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['educator', 'admin']