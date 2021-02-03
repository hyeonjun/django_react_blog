from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth.models import User
from rest_framework import permissions, status, generics, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import Profile
from rest_framework.parsers import MultiPartParser, FormParser

@api_view(['GET']) # get요청만 가능
def current_user(request):
    # 사용자가 다시 사이트 방문하거나 로드하면서 React가 상태를 잊게하는 다른 작업을
    # 수행할 때 이 메소드가 실행되면서 username 필드로 조회해서 토큰이 있는지 확인
    # 자동으로 인증하면서 유효성 확인
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class CreateUser(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT, PATCH, POST'])
class ProfileUpdateAPI(generics.UpdateAPIView):
    lookup_field = "user_id"
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

def validation_nick(request):
    try:
        profile = Profile.objects.get(nickname=request.GET['nickname'])
    except Exception as e:
        profile = None
    result = {
        'result':'success',
        'data':'사용할 수 있습니다.'
    }
    return JsonResponse(result)

class ProfileAPI(generics.RetrieveAPIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []
    permission_classes = []

    lookup_field = "user_id"
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDelteAPI(generics.DestroyAPIView):
    lookup_field = "id"
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class CreateAPI(generics.CreateAPIView):
#     permission_classes = [permissions.IsAuthenticated, ]
#     serializer_class = CreateSerializer
#     def post(self, request, *args, **kwargs):
#         if len(request.data["username"]) < 6 or len(request.data["password"]) < 8:
#             body = {"message": "short field"}
#             return Response(body, status=status.HTTP_400_BAD_REQUEST)
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         return Response({
#             "user": UserSerializer(
#                 user, context=self.get_serializer_context()
#             ).data,
#             "token": AuthToken.objects.create(user)[1],
#         })

# class ObtainTokenPiarWithColorView(TokenObtainPairView):
#     permission_classes = (permissions.AllowAny,)
#     serializer_class = MyTokenObtainPiarSerializer
#
# class LoginAPI(generics.GenericAPIView):
#     permission_classes = (permissions.AllowAny,)
#     serializer_class = LoginUserSerializer
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         print(request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data
#         return Response(
#             {
#                 "user": UserSerializer(
#                     user, context=self.get_serializer_context()).data,
#                 "token":AuthToken.objects.create(user)[1],
#             }
#         )
#
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user


class ListAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = UserSerializer
#
#
#
# class UpdateAPI(generics.RetrieveUpdateDestroyAPIView):
#     queryset = userInfo.objects.all()
#     serializer_class = UserSerializer
#
# class DeleteAPI(generics.DestroyAPIView):
#     queryset = userInfo.objects.all()
#     serializer_class = DeleteSerializer