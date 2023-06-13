from rest_framework.permissions import BasePermission

from users.models import User


class IsStandardUser(BasePermission):

    def has_permission(self, request, view):

        try:
            user = User.objects.get(
                email=request.user,
                is_superuser=False
            )
        except User.DoesNotExist:
            return False
        return True


# class IsSuperuserUser(BasePermission):
    

#     def has_permission(self, request, view):

#         try:
#             user = User.objects.get(
#                 email=request.user,
#                 is_superuser=True
#             )
#         except User.DoesNotExist:
#             return False
#         return True