###
# Widgets determine what input field is used for a certain
# model field. Each Django model field has a default widget,
# but this can be overridden in the admin model.
###


class BaseWidget:
    @classmethod
    def serialize(cls):
        return {"name": cls.__name__}


class InputWidget(BaseWidget):
    pass


class TextAreaWidget(BaseWidget):
    pass


class SwitchWidget(BaseWidget):
    pass


class CheckboxWidget(BaseWidget):
    pass


class DateWidget(BaseWidget):
    pass


class DateTimeWidget(BaseWidget):
    pass


class TimeWidget(BaseWidget):
    pass


class RichTextWidget(BaseWidget):
    pass


class RadioButtonWidget(BaseWidget):
    pass


class SelectWidget(BaseWidget):
    pass


class MultiSelectWidget(BaseWidget):
    pass


class URLPathWidget(BaseWidget):
    pass


class SlugWidget(BaseWidget):
    pass
