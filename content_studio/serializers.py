from content_studio.settings import cs_settings
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.relations import RelatedField

user_model = get_user_model()

admin_site = cs_settings.ADMIN_SITE


class ContentRelatedField(RelatedField):

    def to_representation(self, value):
        data = {"id": value.id, "__str__": str(value)}

        # Add file URL and media type if the model is a media library model.
        if value.__class__ is cs_settings.MEDIA_LIBRARY_MODEL:
            data["file"] = value.file.url
            data["type"] = value.type
            data["thumbnail"] = admin_site.get_thumbnail(value)

        return data

    def to_internal_value(self, data):
        return self.get_queryset().get(id=data["id"])


class ContentSerializer(serializers.ModelSerializer):
    __str__ = serializers.CharField(read_only=True)
    serializer_related_field = ContentRelatedField


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
