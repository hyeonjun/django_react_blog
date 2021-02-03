# import sys
# sys.path.append('C:\\django-react')
# from backend.userInfo.serializers import UserSerializer
from userInfo.serializers import UserSerializer
def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }