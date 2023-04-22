from django.db.models.signals import post_save, post_delete, post_init
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.core.mail import send_mail
from django.urls import reverse

from config import settings
from users.models import UserAccount


@receiver(post_save, sender=UserAccount)
def create_auth_token(sender, instance=None, created=True, **kwargs):
    if created:
        Token.objects.create(user=instance)
