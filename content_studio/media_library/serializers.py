from rest_framework import serializers

from content_studio.settings import cs_settings


class MediaItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = cs_settings.MEDIA_LIBRARY_MODEL
        fields = "__all__"


class MediaFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = cs_settings.MEDIA_LIBRARY_FOLDER_MODEL
        fields = ["id", "name"]
