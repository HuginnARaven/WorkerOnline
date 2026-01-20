from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from companies.views import CompanySinUpView, WorkerView, QualificationView, TaskView, TaskAppointmentView, \
    WorkerLogView, CompanyTaskCommentView, TaskRecommendationView, WorkerReportView, AutoAppointmentView, \
    WorkerScheduleView, VotingView, GetVotingResult

company_router = routers.SimpleRouter()
company_router.register(r'singup', CompanySinUpView, basename='singup')
company_router.register(r'worker', WorkerView, basename='worker')
company_router.register(r'logs', WorkerLogView, basename='logs')
company_router.register(r'qualification', QualificationView, basename='qualification')
company_router.register(r'task', TaskView, basename='task')
company_router.register(r'appointment', TaskAppointmentView, basename='appointment')
company_router.register(r'comment-task', CompanyTaskCommentView, basename='comment-task')
company_router.register(r'task-recommendation', TaskRecommendationView, basename='task-recommendation')
company_router.register(r'worker-report', WorkerReportView, basename='worker-report')
company_router.register(r'worker-schedule', WorkerScheduleView, basename='worker-schedule')
company_router.register(r'voting', VotingView, basename='voting')
company_router.register(r'voting-results', GetVotingResult, basename='voting-results')

urlpatterns = [
    path('company/', include(company_router.urls)),
    path('company/auto-appointment/', AutoAppointmentView.as_view()),
]
