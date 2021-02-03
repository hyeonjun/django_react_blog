from django.urls import path
from .views import *

urlpatterns=[
    path('premium/', blog.as_view(), name="premium"), # 쓰기
    path('premium/like/', blogLikeViewSet.as_view()), # 좋아요
    path('premium/<int:id>/', blogReadAPI.as_view()), # 읽기
    path('premium/<int:id>/update/', blogUpdateAPI.as_view()), # 수정
    path('premium/<int:id>/delete/', blogDelAPI.as_view()), # 삭제
    path('partner/', blog_1.as_view(), name="partner"),  # 쓰기
    path('partner/like/', blog_1LikeViewSet.as_view()),  # 좋아요
    path('partner/<int:id>/', blog_1ReadAPI.as_view()),  # 읽기
    path('partner/<int:id>/update/', blog_1UpdateAPI.as_view()),  # 수정
    path('partner/<int:id>/delete/', blog_1DelAPI.as_view()),  # 삭제
    path('premiumst/', blog_2.as_view(), name="premiumst"),  # 쓰기
    path('premiumst/like/', blog_2LikeViewSet.as_view()),  # 좋아요
    path('premiumst/<int:id>/', blog_2ReadAPI.as_view()),  # 읽기
    path('premiumst/<int:id>/update/', blog_2UpdateAPI.as_view()),  # 수정
    path('premiumst/<int:id>/delete/', blog_2DelAPI.as_view()),  # 삭제
    path('student/', blog_3.as_view(), name="student"),  # 쓰기
    path('student/like/', blog_3LikeViewSet.as_view()),  # 좋아요
    path('student/<int:id>/', blog_3ReadAPI.as_view()),  # 읽기
    path('student/<int:id>/update/', blog_3UpdateAPI.as_view()),  # 수정
    path('student/<int:id>/delete/', blog_3DelAPI.as_view()),  # 삭제
    # path('blog/<int:pk>/',posting, name="posting"),
    # path('blog/new_board/', new_post),
    # path('blog/<int:pk>/remove/', remove_post),
]