from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserAccount(AbstractUser):
    USER_ROLES = [
        ('C', 'Company'),
        ('W', 'Worker'),
        ('A', 'Admin'),
    ]
    last_login = None
    first_name = None
    last_name = None
    role = models.CharField(
        max_length=1,
        choices=USER_ROLES,
    )

    def __str__(self):
        return self.username


class TechSupportRequest(models.Model):
    STATUSES = [
        ('CR', _('Created')),
        ('VW', _('Viewed')),
        ('CL', _('Closed')),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    admin_response = models.TextField(null=True)
    time_created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=2, choices=STATUSES, default='CR')

    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=False)

    class Meta:
        verbose_name = _('Tech support request')
        verbose_name_plural = _('Tech support requests')

    def __str__(self):
        return f'#{self.id} {self.title} from {self.user.username} ({self.status})'
