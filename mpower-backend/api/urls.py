from django.urls import path
from .views import *

urlpatterns = [
    path('login/', UserAuthAPIView.as_view(), name='user-auth'),
    path('branch/', BranchListAPIView.as_view(), name='branch-list'),
    path('main-nav/', MainNavAPIView.as_view(), name='main-nav'),
    path('sub-nav/', SubNavAPIView.as_view(), name='sub-nav'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
]
