from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
# @api_view(['GET,POST'])
# def validate_jwt_token(request):
#     try:
#         token = request.META['HTTP_AUTHORIZATION']
#         data = {'token': token.split()[1]}
#         VerifyJSONWebTokenSerializer().validate(data)
#     except Exception as e:
#         return Response(e)
#
#     return Response(status=status.HTTP_200_OK)



class getUsername(APIView):
    def post(self, request, format=None):
        data = {'token' : request.META.get('HTTP_AUTHORIZATION').split(' ')[1]}
        valid_data = VerifyJSONWebTokenSerializer().validate(data)
        return Response(valid_data['user'].username)