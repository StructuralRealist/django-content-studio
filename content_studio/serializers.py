from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.relations import RelatedField

user_model = get_user_model()


class ContentRelatedField(RelatedField):

    def to_representation(self, value):
        return {"id": value.id, "__str__": str(value)}


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
