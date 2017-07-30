from django.conf.urls import url

from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'search/', views.search, name='search'),	
    url(r'register/newsletter/', views.registerNewsletter, name='registerNewsletter')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)