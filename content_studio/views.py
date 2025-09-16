from django.conf import settings
from django.contrib import admin
from django.urls import reverse, NoReverseMatch
from django.utils.translation import gettext_lazy as _
from django.views.generic import TemplateView
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from . import __version__
from .admin import AdminSerializer, ModelGroup
from .models import ModelSerializer
from .serializers import SessionUserSerializer
from .settings import cs_settings


class ContentStudioWebAppView(TemplateView):
    """
    View for rendering the content studio web app.
    """

    template_name = "content_studio/index.html"


class AdminApiViewSet(ViewSet):
    """
    View set for content studio admin endpoints.
    """

    permission_classes = [IsAdminUser]
    renderer_classes = [JSONRenderer]

    @action(
        methods=["get"],
        detail=False,
        url_path="info",
        permission_classes=[AllowAny],
    )
    def info(self, request):
        """
        Returns public information about the Content Studio admin.
        """
        admin_site = cs_settings.ADMIN_SITE

        data = {
            "version": __version__,
            "site_header": admin_site.site_header,
            "site_title": admin_site.site_title,
            "index_title": admin_site.index_title,
            "site_url": admin_site.site_url,
            "health_check": get_health_check_path(),
            "login_backends": [
                backend.get_info()
                for backend in admin_site.login_backend.active_backends
            ],
            "token_backend": admin_site.token_backend.active_backend.get_info(),
            "formats": {
                model_class.__name__: frmt.serialize()
                for model_class, frmt in admin_site.default_format_mapping.items()
            },
            "widgets": {
                model_class.__name__: widget.serialize()
                for model_class, widget in admin_site.default_widget_mapping.items()
            },
        }

        return Response(data=data)

    @action(
        methods=["get"],
        detail=False,
        url_path="discover",
    )
    def discover(
        self,
        request,
    ):
        """
        Returns information about the Django app (models, admin models, admin site, settings, etc.).
        """
        data = {
            "models": get_models(request),
            "model_groups": get_model_groups(),
            "user_model": settings.AUTH_USER_MODEL,
        }

        return Response(data=data)

    @action(methods=["get"], detail=False, url_path="me")
    def me(self, request):
        """
        Returns information about the current user.
        """
        return Response(SessionUserSerializer(request.user).data)


def get_models(request):
    models = []
    registered_models = admin.site._registry

    for model, admin_class in registered_models.items():
        models.append(
            {
                **ModelSerializer(model).serialize(),
                "admin": AdminSerializer(admin_class).serialize(request),
            }
        )

    return models


def get_model_groups():
    admin_site = cs_settings.ADMIN_SITE

    default_group = [
        ModelGroup(
            label=_("Content"),
            name="default",
            icon=None,
            models=[model for model, admin_model in admin.site._registry.items()],
        )
    ]
    # Get custom model groups or use the default one
    model_groups = getattr(admin_site, "model_groups", None) or default_group

    return [
        {
            "name": group.name,
            "icon": group.icon,
            "color": group.color,
            "label": group.label,
            "models": [m._meta.label_lower for m in group.models],
        }
        for group in model_groups
    ]


def get_health_check_path():
    try:
        return reverse("healthcheck")
    except NoReverseMatch:
        return None
