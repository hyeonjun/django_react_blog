from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import sys
sys.path.append('C:\\django-react\\backend\\chat\\')
import chat.routing

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
