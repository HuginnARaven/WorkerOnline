from django.db.models.signals import post_save, post_delete, post_init
from django.dispatch import receiver
from django.core.mail import send_mail
from django.urls import reverse

from config import settings
from users.models import UserAccount
