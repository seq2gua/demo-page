from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('news_list', views.news_list, name='news_list'),
    path('summary/<int:doc_id>/<str:method>', views.summary, name='summary'),
]
