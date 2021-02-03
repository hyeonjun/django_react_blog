from django.conf.urls import url
from . import users

websocket_urlpatterns = [
    url(r'^ws/chat/(?P<room_name>[^/]+)/$', users.ChatUsers.as_asgi()),
]