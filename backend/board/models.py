from django.db import models
from django.contrib.auth.models import User
from ckeditor_uploader.fields import RichTextUploadingField

# Create your models here.
class Premium(models.Model): # 프리미엄 파트너
    title = models.CharField(max_length=50) # 제목
    contents = RichTextUploadingField() # 내용
    like = models.IntegerField(default=0) # 좋아요 수
    category = models.CharField(max_length=20) # 프리미엄인지 일반인지 수강생인지
    pub_date = models.DateTimeField(auto_now_add=True) # 발행 시간
    nickname = models.CharField(max_length=200, default="") # 닉네임
    profileImage = models.CharField(default='/media/basic.jpg', max_length=500) # 프로필 이미지
    user_id = models.IntegerField(default=True) # 유저 번호
    infomation = models.CharField(max_length=200, null=True) # 샵애들
    likedUser = models.TextField(blank=True)

    def __str__(self):
        return self.title

class Partner(models.Model): # 일반 파트너
    title = models.CharField(max_length=50) # 제목
    contents = RichTextUploadingField() # 내용
    like = models.IntegerField(default=0) # 좋아요 수
    category = models.CharField(max_length=20) # 프리미엄인지 일반인지 수강생인지
    pub_date = models.DateTimeField(auto_now_add=True) # 발행 시간
    nickname = models.CharField(max_length=200, default="") # 닉네임
    profileImage = models.CharField(default='/media/basic.jpg', max_length=500) # 프로필 이미지
    user_id = models.IntegerField(default=True) # 유저 번호
    infomation = models.CharField(max_length=200, null=True) # 샵애들
    likedUser = models.TextField(blank=True)

    def __str__(self):
        return self.title

class Premiumst(models.Model): # 프리미엄 수강생
    title = models.CharField(max_length=50) # 제목
    contents = RichTextUploadingField() # 내용
    like = models.IntegerField(default=0) # 좋아요 수
    category = models.CharField(max_length=20) # 프리미엄인지 일반인지 수강생인지
    pub_date = models.DateTimeField(auto_now_add=True) # 발행 시간
    nickname = models.CharField(max_length=200, default="") # 닉네임
    profileImage = models.CharField(default='/media/basic.jpg', max_length=500) # 프로필 이미지
    user_id = models.IntegerField(default=True) # 유저 번호
    infomation = models.CharField(max_length=200, null=True) # 샵애들
    likedUser = models.TextField(blank=True)

    def __str__(self):
        return self.title

class Student(models.Model): # 일반 수강생
    title = models.CharField(max_length=50) # 제목
    contents = RichTextUploadingField() # 내용
    like = models.IntegerField(default=0) # 좋아요 수
    category = models.CharField(max_length=20) # 프리미엄인지 일반인지 수강생인지
    pub_date = models.DateTimeField(auto_now_add=True) # 발행 시간
    nickname = models.CharField(max_length=200, default="") # 닉네임
    profileImage = models.CharField(default='/media/basic.jpg', max_length=500) # 프로필 이미지
    user_id = models.IntegerField(default=True) # 유저 번호
    infomation = models.CharField(max_length=200, null=True) # 샵애들
    likedUser = models.TextField(blank=True)

    def __str__(self):
        return self.title


# class normal:
#
#
# class students:
#
#
# class categoris:

