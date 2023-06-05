from rest_framework.permissions import BasePermission
from users.models import Users

class IsStandardUser(BasePermission):

    def has_permission(self, request, view):

        try:
            user = Users.objects.get(
                email=request.user,
                is_recruiter=False
            )
        except Users.DoesNotExist:
            return False
        return True

class IsRecruiterUser(BasePermission):
    
    def has_permission(self, request, view):

        try:
            user = Users.objects.get(
                email=request.user,
                is_recruiter=True
            )
        except Users.DoesNotExist:
            return False
        return True
