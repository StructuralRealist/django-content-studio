from django.apps import AppConfig
from django.contrib import admin

from . import VERSION
from .paginators import ContentPagination
from .settings import cs_settings
from .utils import is_runserver


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
        from .serializers import ContentSerializer

        for model, admin_model in admin.site._registry.items():

            class Pagination(ContentPagination):
                page_size = admin_model.list_per_page

            class ViewSet(BaseModelViewSet):
                _model = model
                _admin_model = admin_model
                is_singleton = getattr(admin_model, "is_singleton", False)
                pagination_class = Pagination
                queryset = _model.objects.all()
                search_fields = list(_admin_model.search_fields).copy()

                def get_serializer_class(self):
                    if self.action == "list" and not self.is_singleton:

                        class Serializer(ContentSerializer):

                            class Meta:
                                model = self._model
                                fields = [
                                    "id",
                                    "__str__",
                                ] + list(self._admin_model.list_display)

                    else:

                        class Serializer(ContentSerializer):

                            class Meta:
                                model = self._model
                                fields = "__all__"

                    return Serializer

            content_studio_router.register(
                f"api/content/{model._meta.label_lower}",
                ViewSet,
                f"content_studio_api-{model._meta.label_lower}",
            )
        log(
            ":white_check_mark:",
            f"[green]Created CRUD API[/green]",
        )
