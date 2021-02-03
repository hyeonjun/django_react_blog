#backend/post/models.py 모델 정의
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit
from imagekit.processors import Thumbnail
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=200, blank=True)
    # photo = models.ImageField(upload_to="profile/image/", default="profile/image/basic.jpg")
    photo = ProcessedImageField(
        upload_to="profile/image",
        default="profile/image/basic.jpg",
        processors=[ResizeToFit(width=960, upscale=False), Thumbnail(100, 100)],
        options = {'quality': 90},
    )
    point = models.IntegerField(blank=True, default="0")
    grade = models.IntegerField(blank=True, default="0")
    myIntro = models.CharField(max_length=200, blank=True)
    Tier = models.CharField(max_length=20, blank=True)
    username_info = models.CharField(max_length=150, unique=True, default="")
    email_info = models.EmailField(unique=True, null=False, default="")
    password_info = models.CharField(max_length=128, default="")
    name = models.CharField(max_length=150, null=False, default="")
    number = models.CharField(max_length=12, unique=True,default="010", null=False)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(
            user=instance,
            username_info=instance.username,
            email_info=instance.email,
            password_info=instance.password,
            name=instance.first_name,
            number=instance.phonenum
        )

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

