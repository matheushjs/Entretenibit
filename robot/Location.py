

class Location():
    """Class representing a location in our problem domain.

    Storage of a Location in memory can only happen if all the fields
    are filled, hence why the constructor has many arguments without defaults."""

    def __init__(self, name, street, number, district):
        """'name' is a string with the name of the location
        'street' is a string with the name of its street
        'number' is the number of the location in that street
        'district' is the district of the location (aka bairro))"""

        # Check types
        if type(name) is not str \
        or type(street) is not str \
        or type(number) is not int \
        or type(district) is not str:
            raise TypeError("One of the arguments is of the wrong type")
        
        # Check values
        if number < 0:
            raise ValueError("One of the arguments has an invallid value")

        self.name = name
        self.street = street
        self.number = number
        self.district = district

    def __str__(self):
        format = "Location Name: {}\n" + \
            "Address: {}, {} - {}"

        return format.format(
            self.name if self.name else "None",
            self.street if self.street else "None",
            self.number if self.number else "None",
            self.district if self.district else "None"
        )

if __name__ == '__main__':
    ev = Location("Meu querido bar", "Rua santo antônio do satanas", 666, "polígono espectral")
    
    try:
        ev = Location("Meu querido bar", "Rua santo antônio do satanas", -666, "polígono espectral")
    except Exception as e:
        print(e)

    try:
        ev = Location("Meu querido bar", 12345, 666, "polígono espectral")
    except Exception as e:
        print(e)
