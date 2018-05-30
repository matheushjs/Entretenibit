import datetime as dt
from Event import Event
from Location import Location

class Occurence():
    """Class representing an occurance of an event in our problem domain."""

    def __init__(self, event, date, location = None, pricing = None):
        """'event' is an Event object related to the event that will happen
        'date' is either a dt.date or dt.datetime object signalling when the event will happen
        'location' is a Location object containing the location where the event will happen
        'pricing' is a list of pairs of string-like (class, price) with the pricing of the event"""
        
        # Check types
        if type(event) is not Event \
        or type(date) not in [dt.date, dt.datetime] \
        or location and type(location) is not Location \
        or pricing and type(pricing) is not list:
            raise TypeError("One of the arguments is of the wrong type")

        self.event = event
        self.date = date
        self.location = location

        # Normalize pricing
        if pricing:
            self.pricing = []
            for tupl in pricing:
                self.pricing.append(( str(i) for i in tupl ))
        else:
            self.pricing = None

    def __str__(self):
        format = "{}\n" + \
            "Date: {}\n" + \
            "{}\n" + \
            "Pricing: {}\n"

        return format.format(
            str(self.event),
            str(self.date),
            str(self.location) if self.location else "No Location",
            " ".join([ "/".join([i for i in self.pricing ])]) if self.pricing else "None"
        )

if __name__ == '__main__':
    ev1 = Event("O mágico de oz", "Um mágico legal", Event.THEATER, [])
    ev2 = Event("O mágico de oz", "Um mágico legal", Event.THEATER, [
            ("somebody", "violinist"),
            ("second somebody", "second violinist"),
        ])

    loc = Location("Meu querido bar", "Rua santo antônio do satanas", 666, "polígono espectral")

    noTime = dt.date(1996, 6, 6)
    withTime = dt.datetime(1996, 6, 6, 14, 30)

    oc = Occurence(ev1, noTime)
    oc = Occurence(ev2, withTime, loc)
    oc = Occurence(ev1, noTime, loc, [('idoso', 95), ('estudante', 85)])

    try:
        oc = Occurence(None, noTime)
    except Exception as e:
        print(e)

    try:
        oc = Occurence(ev1, '10/08/1996')
    except Exception as e:
        print(e)

    try:
        oc = Occurence(None, '10/08/1996', loc, 'pricing')
    except Exception as e:
        print(e)
