from typing import Type

from django.contrib import admin
from django.db.models import Model
from rest_framework.request import HttpRequest

from .dashboard import Dashboard
from .form import FormSet, FormSetGroup
from .login_backends import LoginBackendManager
from .token_backends import TokenBackendManager

register = admin.register


class AdminSite(admin.AdminSite):
    """
    Enhanced admin site for Django Content Studio.
    """

    token_backend = TokenBackendManager()

    login_backend = LoginBackendManager()

    dashboard = Dashboard()

    model_groups = None

    def setup(self):
        # Add token backend's view set to the
        # Content Studio router.
        self.token_backend.set_up_router()
        # Add login backend's view set to the
        # Content Studio router.
        self.login_backend.set_up_router()


admin_site = AdminSite()


class ModelAdmin(admin.ModelAdmin):
    """
    Enhanced model admin for Django Content Studio and integration with
    Django Content Framework. Although it's relatively backwards compatible,
    some default behavior has been changed.
    """

    # We set a lower limit than Django's default of 100
    list_per_page = 20

    # Description shown below model name on list pages
    list_description = ""

    # Configure the main section in the edit-view.
    edit_main: list[type[FormSetGroup | FormSet | str]] = []

    # Configure the sidebar in the edit-view.
    edit_sidebar: list[type[FormSet | str]] = []

    icon = None

    def save_model(self, request, obj, form, change):
        if hasattr(obj, "edited_by"):
            obj.edited_by = request.user
        super().save_model(request, obj, form, change)

    def has_add_permission(self, request):
        is_singleton = getattr(self.model, "is_singleton", False)

        # Don't allow to add more than one singleton object.
        if is_singleton and self.model.objects.get():
            return False

        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        is_singleton = getattr(self.model, "is_singleton", False)

        if is_singleton:
            return False

        return super().has_delete_permission(request, obj)

    def render_change_form(self, request, context, *args, **kwargs):
        is_singleton = getattr(self.model, "is_singleton", False)

        context["show_save_and_add_another"] = not is_singleton

        return super().render_change_form(request, context, *args, **kwargs)


class AdminSerializer:
    """
    Class for serializing Django admin classes.
    """

    def __init__(self, admin_class: ModelAdmin):
        self.admin_class = admin_class

    def serialize(self, request: HttpRequest):
        admin_class = self.admin_class

        return {
            "icon": getattr(admin_class, "icon", None),
            "edit": {
                "main": self.serialize_edit_main(request),
                "sidebar": self.serialize_edit_sidebar(request),
            },
            "list": {
                "per_page": admin_class.list_per_page,
                "description": getattr(admin_class, "list_description", ""),
                "display": admin_class.list_display,
            },
            "permissions": {
                "add_permission": admin_class.has_add_permission(request),
                "delete_permission": admin_class.has_delete_permission(request),
                "change_permission": admin_class.has_change_permission(request),
                "view_permission": admin_class.has_view_permission(request),
            },
        }

    def serialize_edit_main(self, request):
        admin_class = self.admin_class

        return [
            i.serialize()
            for i in self.get_edit_main(
                getattr(admin_class, "edit_main", admin_class.get_fields(request))
            )
        ]

    def serialize_edit_sidebar(self, request):
        admin_class = self.admin_class

        return [
            i.serialize()
            for i in self.get_edit_sidebar(getattr(admin_class, "edit_sidebar", None))
        ]

    def get_edit_main(self, edit_main):
        """
        Returns a normalized list of form set groups.

        Form sets will be wrapped in a form set group. If the edit_main attribute is a list of fields,
        they are wrapped in a form set and a form set group.
        """
        if not edit_main:
            return []
        if isinstance(edit_main[0], FormSetGroup):
            return edit_main
        if isinstance(edit_main[0], FormSet):
            return [FormSetGroup(formsets=edit_main)]

        return [FormSetGroup(formsets=[FormSet(fields=edit_main)])]

    def get_edit_sidebar(self, edit_sidebar):
        """
        Returns a normalized list of form sets for the edit_sidebar.

        If the edit_sidebar attribute is a list of fields,
        they are wrapped in a form set.
        """
        if not edit_sidebar:
            return []
        if isinstance(edit_sidebar[0], FormSet):
            return edit_sidebar

        return [FormSet(fields=edit_sidebar)]


class ModelGroup:
    name = None
    label = None
    icon = None
    color = None
    models = None

    def __init__(
        self,
        name: str,
        label: str = None,
        icon: str = None,
        color: str = None,
        models: list[Type[Model]] = None,
    ):
        self.name = name
        self.label = label or name.capitalize()
        self.icon = icon
        self.color = color
        self.models = models or []
