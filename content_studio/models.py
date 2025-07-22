from django.db import models

from .utils import is_jsonable


class ModelSerializer:
    def __init__(self, model: type[models.Model]):
        self.model = model

    def serialize(self):
        model = self.model

        return {
            "label": model._meta.label_lower,
            "verbose_name": model._meta.verbose_name,
            "verbose_name_plural": model._meta.verbose_name_plural,
            "fields": self.get_fields(),
        }

    def get_fields(self):
        fields = {}

        for field in self.model._meta.fields:
            fields[field.name] = self.get_field(field)

        return fields

    def get_field(self, field):
        data = {
            "verbose_name": field.verbose_name,
            "required": not field.null or not field.blank,
            "type": field.__class__.__name__,
        }

        if field.help_text:
            data["help_text"] = field.help_text

        if is_jsonable(field.default):
            data["default"] = field.default

        if not field.editable:
            data["readonly"] = True

        if field.primary_key:
            data["primary_key"] = True
            data["readonly"] = True

        if field.is_relation:
            data["related_model"] = field.related_model._meta.label_lower

        if getattr(field, "choices", None) is not None:
            data["choices"] = field.choices

        if getattr(field, "max_length", None) is not None:
            data["max_length"] = field.max_length

        return data
