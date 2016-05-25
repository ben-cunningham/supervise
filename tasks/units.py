list = [
    #### metric
    # length
    "cm",
    "m",
    "km",

    # square measures
    "sq. cm.",
    "sq. m",
    "sq. km.",

    # volume
    "ml"
    "l",

    # weight
    "gr",
    "kg",

    #### imperial
    # length
    "in",
    "ft",
    "yd",
    "mi",

    # square measures
    "sq. in",
    "sq. ft.",
    "sq. yd.",
    "sq. mi.",

    # volume
    "pint",
    "qt",
    "cup",
    "gl",

    # weight
    "oz",
    "lb",
]

def get_units():
    choices = ()
    for index, unit in enumerate(list):
        choices += ((index,) + (unit,),)
    return choices

UNIT_CHOICES = get_units()