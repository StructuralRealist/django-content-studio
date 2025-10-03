from rest_framework import status, serializers, exceptions
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from content_studio.paginators import ContentPagination
from content_studio.settings import cs_settings
from .serializers import MediaItemSerializer


class MediaLibraryViewSet(ModelViewSet):
    _media_model = None
    _folder_model = None
    lookup_field = "id"
    parser_classes = [JSONParser, MultiPartParser]
    renderer_classes = [JSONRenderer]
    permission_classes = [DjangoModelPermissions]
    filter_backends = [SearchFilter, OrderingFilter]
    pagination_class = ContentPagination

    def __init__(self, *args, **kwargs):
        super(MediaLibraryViewSet, self).__init__()

        admin_site = cs_settings.ADMIN_SITE

        self.authentication_classes = [
            admin_site.token_backend.active_backend.authentication_class
        ]

    def get_queryset(self):
        if not self._media_model:
            self._media_model = cs_settings.MEDIA_LIBRARY_MODEL

        if not self._media_model:
            raise exceptions.MethodNotAllowed(
                method="GET", detail="Media model not defined."
            )

        return self._media_model.objects.all()

    def get_serializer_class(self):
        if self._media_model:
            return MediaItemSerializer

        raise exceptions.MethodNotAllowed(
            method="GET", detail="Media model not defined."
        )

    @action(methods=["get"], detail=False, url_path="folder-path")
    def get(self, request, *args, **kwargs):

        if not self._folder_model:
            self._folder_model = cs_settings.MEDIA_LIBRARY_FOLDER_MODEL

        if not self._folder_model:
            raise exceptions.MethodNotAllowed(
                method="GET", detail="Folder model not defined."
            )

        folder_id = request.query_params.get("folder", None)

        if not folder_id:
            return Response(data=[])

        try:
            folder = self._folder_model.objects.get(pk=folder_id)
            path = []
            while folder:
                path.insert(0, folder)
                folder = folder.parent

            class FolderPathSerializer(serializers.ModelSerializer):
                class Meta:
                    model = self._folder_model
                    fields = ["id", "name"]

            return Response(data=FolderPathSerializer(path, many=True).data)
        except self._folder_model.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
