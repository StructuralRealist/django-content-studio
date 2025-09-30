from django.contrib.auth import get_user_model
from django.db import models
from rest_framework import serializers
from rest_framework.compat import postgres_fields
from rest_framework.fields import ModelField, CharField, ChoiceField
from rest_framework.utils.field_mapping import ClassLookupDict, get_field_kwargs

user_model = get_user_model()


class RelatedField(serializers.Field):
    def to_representation(self, value):
        return {"id": value.id, "__str__": str(value)}


class ContentSerializer(serializers.ModelSerializer):
    __str__ = serializers.CharField()
    serializer_related_field = RelatedField

    def build_standard_field(self, field_name, model_field):
        """
        Create regular model fields.
        """
        field_mapping = ClassLookupDict(self.serializer_field_mapping)

        field_class = field_mapping[model_field]

        field_kwargs = get_field_kwargs(field_name, model_field)

        # Special case to handle when a OneToOneField is also the primary key
        if model_field.one_to_one and model_field.primary_key:
            field_class = self.serializer_related_field
            field_kwargs["queryset"] = model_field.related_model.objects

        if not issubclass(field_class, ModelField):
            # `model_field` is only valid for the fallback case of
            # `ModelField`, which is used when no other typed field
            # matched to the model field.
            field_kwargs.pop("model_field", None)

        if not issubclass(field_class, CharField) and not issubclass(
            field_class, ChoiceField
        ):
            # `allow_blank` is only valid for textual fields.
            field_kwargs.pop("allow_blank", None)

        is_django_jsonfield = hasattr(models, "JSONField") and isinstance(
            model_field, models.JSONField
        )
        if (
            postgres_fields and isinstance(model_field, postgres_fields.JSONField)
        ) or is_django_jsonfield:
            # Choices are not valid for JSONField, but they might be used.
            field_kwargs.pop("choices", None)
            # Populate the `encoder` argument of `JSONField` instances generated
            # for the model `JSONField`.
            field_kwargs["encoder"] = getattr(model_field, "encoder", None)
            if is_django_jsonfield:
                field_kwargs["decoder"] = getattr(model_field, "decoder", None)

        if postgres_fields and isinstance(model_field, postgres_fields.ArrayField):
            # Populate the `child` argument on `ListField` instances generated
            # for the PostgreSQL specific `ArrayField`.
            child_model_field = model_field.base_field
            child_field_class, child_field_kwargs = self.build_standard_field(
                "child", child_model_field
            )
            field_kwargs["child"] = child_field_class(**child_field_kwargs)

        return field_class, field_kwargs


class SessionUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source=user_model.USERNAME_FIELD)

    class Meta:
        model = user_model
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
        )
