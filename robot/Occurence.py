import datetime as dt
from Event import Event
from Location import Location

class Occurence():
    """Class representing an occurance of an event in our problem domain."""

    def __init__(self, event, date, location = None, pricing = None):
        """'event' is an Event object related to the event that will happen
        'date' is either a dt.date or dt.datetime object signalling when the event will happen
        'location' is a Location object containing the location where the event will happen
        'pricing' is a list of pairs of strings (class, price) with the pricing of the event"""
        
        # Check types
        if type(event) is not Event \
        or type(date) not in [dt.date, dt.datetime] \
        or location and type(location) is not Location \
        or pricing and pricing is not list:
            raise TypeError("One of the arguments is of the wrong type")

        self.event = event
        self.date = date
        self.location = location
        self.pricing = pricing
