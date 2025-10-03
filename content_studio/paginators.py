from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class ContentPagination(PageNumberPagination):
    page_size = 20

    def get_paginated_response(self, data):
        return Response(
            {
                "pagination": {
                    "count": self.page.paginator.count,
                    "current": self.page.number,
                    "pages": self.page.paginator.num_pages,
                },
                "results": data,
            }
        )
