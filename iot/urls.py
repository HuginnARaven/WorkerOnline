from django.urls import path, include
from rest_framework import routers

from iot.views import SupervisorCompanyView, SupervisorOptionsView, SupervisorActivityView, WorkerPresenceLogView, \
    OfferCompanyView

iot_router = routers.SimpleRouter()
iot_router.register(r'company-options', SupervisorCompanyView, basename='company-options')
iot_router.register(r'company-offer', OfferCompanyView, basename='company-offer')

urlpatterns = [
    path('iot/', include(iot_router.urls)),
    path('iot/get-options/', SupervisorOptionsView.as_view()),
    path('iot/activity/', SupervisorActivityView.as_view()),
    path('iot/presence-log/', WorkerPresenceLogView.as_view()),
]
