# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

# from andy import remote
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.views.generic.base import TemplateView
from wss_ui.site.fake_data_views.incoming_requests import IncomingRequestsJSON
from wss_ui.site.fake_data_views.awaiting_action_requests import AwaitingActionsRequestsJSON
from wss_ui.site.fake_data_views.my_latest_requests import MyLatestRequestsJSON
from wss_ui.site.fake_data_views.my_requests import MyRequestsJSON
from wss_ui.site.fake_data_views.request_filters import RequestFiltersJSON

from .views import LoginView, LogoutView

admin.autodiscover()

urlpatterns = [
    url(r'^403/$', TemplateView.as_view(template_name='403.html')),
    url(r'^404/$', TemplateView.as_view(template_name='404.html')),
    url(r'^500/$', TemplateView.as_view(template_name='500.html')),
    url(r'^wip/$', TemplateView.as_view(template_name='wip.html')),

    url(r'^login/$', LoginView.as_view(), name="login"),
    url(r'^logout/$', LogoutView.as_view(url='/'), name='logout'),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^$', login_required(TemplateView.as_view(
      template_name='prototype/index.html')), name='home'),

    url(r'^create/$', login_required(TemplateView.as_view(
      template_name='prototype/create.html')), name='create'),

    url(r'^create/hr044/$', login_required(TemplateView.as_view(
      template_name='prototype/hr044.html')), name='hr044'),

    url(r'^my/$', login_required(TemplateView.as_view(
      template_name='prototype/my.html')), name='my'),

    url(r'^incoming/$', login_required(TemplateView.as_view(
      template_name='prototype/incoming.html')), name='incoming'),

]

fake_data_urlpatterns = [
  url(r'^incoming_requests/$', IncomingRequestsJSON.as_view(), name='incoming-requests-json'),
  url(r'^awaiting_action_requests/$', AwaitingActionsRequestsJSON.as_view(), name='awaiting-action-requests-json'),
  url(r'^my_latest_requests/$', MyLatestRequestsJSON.as_view(), name='my-latest-requests-json'),
  url(r'^my_requests/$', MyRequestsJSON.as_view(), name='my-requests-json'),
  url(r'^request_filters/$', RequestFiltersJSON.as_view(), name='request-filters'),

]
urlpatterns += fake_data_urlpatterns
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

