from django.apps import AppConfig
from django.contrib import admin
from rest_framework import serializers
from rest_framework.pagination import PageNumberPagination

from . import VERSION
from .settings import cs_settings
from .utils import is_runserver


class RelatedField(serializers.Field):
    def to_representation(self, value):
        return {"id": value.id, "__str__": str(value)}


class DjangoContentStudioConfig(AppConfig):
    name = "content_studio"
    label = "content_studio"
    initialized = False

    def ready(self):
        from .utils import log

        if is_runserver() and not self.initialized:
            self.initialized = True

            log("\n")
            log("----------------------------------------")
            log("Django Content Studio")
            log(f"Version {VERSION}")
            log("----------------------------------------")
            log(":rocket:", "Starting Django Content Studio")
            log(":mag:", "Discovering admin models...")
            registered_models = len(admin.site._registry)
            log(
                ":white_check_mark:",
                f"[green]Found {registered_models} admin models[/green]",
            )
            # Set up admin site routes
            admin_site = cs_settings.ADMIN_SITE
            admin_site.setup()

            # Set up content CRUD APIs
            self._create_crud_api()

            log("\n")

    def _create_crud_api(self):
        from .viewsets import BaseModelViewSet
        from .router import content_studio_router
        from .utils import log

        for _model, admin_model in admin.site._registry.items():

            class Serializer(serializers.ModelSerializer):
                __str__ = serializers.CharField()
                serializer_related_field = RelatedField

                class Meta:
                    model = _model
                    fields = "__all__"

            class Pagination(PageNumberPagination):
                page_size = admin_model.list_per_page

            class ViewSet(BaseModelViewSet):
                serializer_class = Serializer
                pagination_class = Pagination
                queryset = _model.objects.all()

            content_studio_router.register(
                f"api/content/{_model._meta.label_lower}",
                ViewSet,
                f"content_studio_api-{_model._meta.label_lower}",
            )
        log(
            ":white_check_mark:",
            f"[green]Created CRUD API[/green]",
        )
