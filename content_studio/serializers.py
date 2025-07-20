from django.contrib.auth import get_user_model
from rest_framework import serializers

user_model = get_user_model()


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

