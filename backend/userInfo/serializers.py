#backend/post/serializers.py
from django import forms
from django.contrib.auth.models import User
from rest_framework import serializers, status
from rest_framework.response import Response

from .models import Profile
from rest_framework_jwt.settings import api_settings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
                'username',
                # 'email',
                'id'
            )

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)
    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        if len(password) < 8:
            Response(status=status.HTTP_400_BAD_REQUEST)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = (
            'token',
            'email',
            'password',
            'first_name',
            'phonenum',
            'username',
        )

# Profile
class ProfileSerializer(serializers.ModelSerializer):
    # photo = serializers.ImageField(use_url=True)
    class Meta:
        model = Profile
        fields = (
            'id',
            'username_info',
            'email_info',
            'password_info',
            'name',
            'number',
            'nickname',
            'photo',
            'point',
            'grade',
            'Tier',
            'user_id',
            'myIntro',
        )

# django + react앱은 api요청을 통해 데이터를 주고받는다
# api요청 및 반환값은 데이터 포맷이 JSON형으로 되어있다
# 그래서 이 데이터값들을 JSON으로 직렬화가 필요하다
# 이때 필요한 것이 DRF(djangorestframework)의 serializers다.
# class CreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = (
#             'id',
#             'email',
#             'password',
#             'first_name',
#             'phonenum',
#             'username',
#         )
#         extra_kwards = {'password':{'write_only': True}}
#
#     def create(self, validated_data):
#         user = User.objects.create_user(email=validated_data['email'],
#                     password=validated_data['password'],username=validated_data['username'],
#                     first_name=validated_data['first_name'], phonenum=validated_data['phonenum'])
#         return user

# class MyTokenObtainPiarSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super(MyTokenObtainPiarSerializer, cls).get_token(user)
#
#         #Add custom claims
#         token['fav_color'] = user.fav_color
#         return token
#
# class LoginUserSerializer(serializers.Serializer):
#     username = serializers.CharField(max_length=20)
#     password = serializers.CharField(max_length=20)
#
#     def validate(self, data):
#         user = authenticate(**data)
#         if user and user.is_active:
#             return user
#         raise serializers.ValidationError("Unable to log in with provided credentials.")

# 접속 중인지 확인
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ("id", "username")

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         fields = (
#             'id',
#             'email',
#             'name',
#             'phonenum',
#             'nickname',
#             'mDate',
#         )
#         model = userInfo
#
# class DeleteSerializer(serializers.ModelSerializer):
#     class Meta:
#         fields = ('nickname')
#         model = userInfo