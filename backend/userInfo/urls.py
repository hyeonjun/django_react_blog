#backend/post/urls.py
from django.urls import path, include
from . import views
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
import sys
urlpatterns = [
#     # path('', views.ListPost),
    # http://39.118.174.168:8000/api/
    path('login/', obtain_jwt_token),
    path('verify/', verify_jwt_token),
    path('refresh/', refresh_jwt_token),
    path('current_user/', views.current_user),
    path('register/', views.CreateUser.as_view()),

    # Profile
    path("profile/<int:user_id>/", views.ProfileAPI.as_view()),
    path("profile/<int:user_id>/update/", views.ProfileUpdateAPI.as_view()),
    path("profile/cknickname/", views.validation_nick),
    path("profile/<int:id>/delete/", views.ProfileDelteAPI.as_view()),

    # -- 나중에 할 것 -- #
    path('user/', views.UserAPI.as_view()), # admin에 접속 중 유저
    path('list/', views.ListAPI.as_view({'get':'list'})), # 유저 리스트
    # path('api/login/', views.LoginAPI.as_view()),
    # path('api/<int:pk>/', views.UpdateAPI.as_view()),
    # path('api/<int:pk>/delete/', views.DeleteAPI.as_view()),
]
