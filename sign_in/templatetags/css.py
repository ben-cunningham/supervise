from django import template

register = template.Library()

@register.filter(name='css')
def css(field, div_class):
    return field.as_widget(attrs={"class": div_class})
