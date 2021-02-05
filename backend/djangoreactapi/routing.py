from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import sys
sys.path.append('C:\\django-react\\backend\\chat\\')
import chat.routing

# 클라이언트와 Channels 개발 서버가 연결 될 때, 어느 protocol 타입의 연결인지
application = ProtocolTypeRouter({
    # (http->django views is added by default)
    # if websocket protocol, AuthMiddlewareStack
    'websocket': AuthMiddlewareStack(
        # URLRouter로 연결시킴, 유저의 라우터 연결, http path 조사
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})
