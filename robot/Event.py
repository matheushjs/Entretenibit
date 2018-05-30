

class Event():
    """Class representing an event in our problem domain."""
    
    
    # Enumeration for class types
    ACADEMIC = 0
    MUSICAL  = 1
    THEATER  = 2
    CINEMA   = 3
    _LAST    = 4

    def __init__(self, title, description = None, eventType = None, cast = None, link = None):
        """'title' is a string with the title of the event
        'description' is a string with the description of the event
        'eventType' is one among the enumeration within this class Event
        'cast' is a list of pairs (name, role)
        'link' is the link to the official website of the event"""

        # Check types
        if type(title) is not str \
        or description and type(description) is not str \
        or eventType and type(eventType) is not int \
        or cast and type(cast) is not list:
            raise TypeError("One of the arguments is of the wrong type")

        # Check values
        if eventType is not None:
            if eventType < Event.ACADEMIC \
            or eventType >= Event._LAST:
                raise ValueError("One of the arguments have invallid value")

        # TODO: Some more validation
        
        self.title = title
        self.description = description
        self.eventType = eventType
        self.cast = cast
        self.link = link

    def __str__(self):
        format = "Event Title: {}\n" + \
            "Description: {}\n" + \
            "Type: {}\n" + \
            "Cast: {}\n" + \
            "Link: {}" \
            
        return format.format(
            self.title, 
            self.description if self.description else "None",
            self.eventType if self.eventType else "None",
            ' '.join([ "/".join(i) for i in self.cast ]) if self.cast else "None",
            self.link if self.link else "None" )

if __name__ == "__main__":
    ev = Event("O mágico de oz", "Um mágico legal", Event.THEATER, [])
    ev = Event("O mágico de oz", "Um mágico legal", Event.THEATER, [
            ("somebody", "violinist"),
            ("second somebody", "second violinist"),
        ])

    try:
        ev = Event("O mágico de oz", 2, Event.THEATER, [])
    except Exception as e:
        print(e)

    try:
        ev = Event("O mágico de oz", "Um mágico legal", -7, [])
    except Exception as e:
        print(e)
