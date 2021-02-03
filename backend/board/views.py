from django.shortcuts import render, redirect
from .models import *
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import *
from rest_framework import status, generics
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
class blog(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        post = Premium.objects.all()
        serializer = PremiumSerializer(post, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        Todos_serializer = PremiumSerializer(data=request.data)
        if Todos_serializer.is_valid():
            Todos_serializer.save()
            return Response(Todos_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', Todos_serializer.errors)
            return Response(Todos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class blogReadAPI(generics.RetrieveAPIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []
    permission_classes = []

    lookup_field = "id"
    queryset = Premium.objects.all()
    serializer_class = PremiumSerializer

class blogUpdateAPI(generics.UpdateAPIView):
    lookup_field = "id"
    queryset = Premium.objects.all()
    serializer_class = PremiumSerializer

class blogDelAPI(generics.DestroyAPIView):
    lookup_field = "id"
    queryset = Premium.objects.all()
    serializer_class = PremiumSerializer

class blogLikeViewSet(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        Todos = Premium.objects.all().order_by('like')
        serializer = PremiumSerializer(Todos, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        Todos_serializer = PremiumSerializer(data=request.data)
        if Todos_serializer.is_valid():
            Todos_serializer.save()
            return Response(Todos_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', Todos_serializer.errors)
            return Response(Todos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# --------------------------------------------------------------------------------------
class blog_1(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        post = Partner.objects.all()
        serializer = PartnerSerializer(post, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        Todos_serializer = PartnerSerializer(data=request.data)
        if Todos_serializer.is_valid():
            Todos_serializer.save()
            return Response(Todos_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', Todos_serializer.errors)
            return Response(Todos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class blog_1ReadAPI(generics.RetrieveAPIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []
    permission_classes = []

    lookup_field = "id"
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

class blog_1UpdateAPI(generics.UpdateAPIView):
    lookup_field = "id"
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

class blog_1DelAPI(generics.DestroyAPIView):
    lookup_field = "id"
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

class blog_1LikeViewSet(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        Todos = Partner.objects.all().order_by('like')
        serializer = PartnerSerializer(Todos, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        Todos_serializer = PartnerSerializer(data=request.data)
        if Todos_serializer.is_valid():
            Todos_serializer.save()
            return Response(Todos_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', Todos_serializer.errors)
            return Response(Todos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# --------------------------------------------------------------------------------------

class blog_2(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        post = Premiumst.objects.all()
        serializer = PremiumstSerializer(post, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        Todos_serializer = PremiumstSerializer(data=request.data)
        if Todos_serializer.is_valid():
            Todos_serializer.save()
            return Response(Todos_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', Todos_serializer.errors)
            return Response(Todos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class blog_2ReadAPI(generics.RetrieveAPIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []
    permission_classes = []

    lookup_field = "id"
    queryset = Premiumst.objects.all()
    serializer_class = PremiumstSerializer

class blog_2UpdateAPI(generics.UpdateAPIView):
    lookup_field = "id"
    queryset = Premiumst.objects.all()
    serializer_class = PremiumstSerializer

class blog_2DelAPI(generics.DestroyAPIView):
    lookup_field = "id"
    queryset = Premiumst.objects.all()
    serializer_class = PremiumstSerializer

class blog_2LikeViewSet(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        Todos = Premiumst.objects.all().order_by('like')
        serializer = PremiumstSerializer(Todos, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        Todos_serializer = PremiumstSerializer(data=request.data)
        if Todos_serializer.is_valid():
            Todos_serializer.save()
            return Response(Todos_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', Todos_serializer.errors)
            return Response(Todos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# --------------------------------------------------------------------------------------

class blog_3(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        post = Student.objects.all()
        serializer = StudentSerializer(post, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        Todos_serializer = StudentSerializer(data=request.data)
        if Todos_serializer.is_valid():
            Todos_serializer.save()
            return Response(Todos_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', Todos_serializer.errors)
            return Response(Todos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class blog_3ReadAPI(generics.RetrieveAPIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []
    permission_classes = []

    lookup_field = "id"
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class blog_3UpdateAPI(generics.UpdateAPIView):
    lookup_field = "id"
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class blog_3DelAPI(generics.DestroyAPIView):
    lookup_field = "id"
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class blog_3LikeViewSet(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        Todos = Student.objects.all().order_by('like')
        serializer = StudentSerializer(Todos, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        Todos_serializer = StudentSerializer(data=request.data)
        if Todos_serializer.is_valid():
            Todos_serializer.save()
            return Response(Todos_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', Todos_serializer.errors)
            return Response(Todos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)






# def posting(request, pk):
#     board = Premium.objects.get(pk=pk)
#     return render(request, 'board/posting.html', {'board':board})
#
# def new_post(reqeust):
#     if reqeust.method == 'POST':
#         if reqeust.POST['photo']:
#             new_article = Premium.objects.create(
#                 title=reqeust.POST['title'],
#                 contents=reqeust.POST['contents'],
#                 photo = reqeust.POST['photo'],
#             )
#         else:
#             new_article = Premium.objects.create(
#                 title=reqeust.POST['title'],
#                 contents=reqeust.POST['contents'],
#                 photo=reqeust.POST['photo'],
#             )
#         return redirect('/board/blog/')
#     return render(reqeust, 'board/new_board.html')
#
# def remove_post(request, pk):
#     board = Premium.objects.get(pk=pk)
#     if request.method == 'POST':
#         board.delete()
#         return redirect('/board/blog/')
#     return render(request, 'board/remove_board.html', {'board':board})


