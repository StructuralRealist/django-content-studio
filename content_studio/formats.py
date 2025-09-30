###
# Formats determine how fields are displayed in Django Content Studio.
# Each Django model field has a default format, but this can be
# overridden in the admin model.
###


class BaseFormat:
    @classmethod
    def serialize(cls):
        return {"name": cls.__name__}


class ForeignKeyFormat(BaseFormat):
    pass


class TextFormat(BaseFormat):
    pass


class HtmlFormat(BaseFormat):
    pass


class BooleanFormat(BaseFormat):
    pass


class DateFormat(BaseFormat):
    pass


class DateTimeFormat(BaseFormat):
    pass


class TimeFormat(BaseFormat):
    pass


class NumberFormat(BaseFormat):
    pass


class FileSizeFormat(BaseFormat):
    pass


class TagFormat(BaseFormat):
    pass
