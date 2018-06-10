import datetime as dt
import psycopg2 # possibly for database connection
import sys
import traceback

import Robot
import Occurence
import Event
import Location



# This file contains the functions for database interfacing



# Converts from number to string event type
def convertEventType(num_type):
    if num_type == 0:
        return 'ACADEMIC'
    elif num_type == 1:
        return 'MUSICAL'
    elif num_type == 2:
        return 'THEATER'
    elif num_type == 3:
        return 'CINEMA'
    return 'NO TYPE'

# Connects with the database, returns the connection
def connect():
    # Reads the information from a .env file not provided
    with open(".env", "r") as env_file:
        user, host, database = [x.rstrip() for x in env_file.readlines()]
    user = user[user.index("'") + 1:-1]
    host = host[host.index("'") + 1:-1]
    database = database[database.index("'") + 1:-1]

    conn = psycopg2.connect(host=host, database=database, user=user)
    return conn

# Scrape and get the occurences of events
def getOccurences():
    robot = Robot.Robot()
    return robot.scrapeAll()

def insertLocation(location):
    conn = connect()
    cur = conn.cursor()

    insertLocationSQL = """
        INSERT INTO location (name, street, number, district)
            VALUES ('{0}', '{1}', {2}, '{3}')
            ON CONFLICT DO NOTHING;
    """.format(location.name, location.street,
               location.number, location.district)

    cur.execute(insertLocationSQL)
    conn.commit() # commit saves changes to the database

def insertEvent(event):
    conn = connect()
    cur = conn.cursor()

    # cast people need special handling for insertion on the database
    eventCasting = [""] if event.cast is None else ["-".join(x) for x in event.cast]

    insertEventSQL = """
        INSERT INTO event (title, description, casting, link)
            VALUES ('{0}', '{1}', '{2}', '{3}')
            ON CONFLICT DO NOTHING;
    """.format(event.title, event.description, "\n".join(eventCasting), event.link)

    cur.execute(insertEventSQL)
    conn.commit() # commit saves changes to the database


def insertOccurence(occurence):
    conn = connect()
    cur = conn.cursor()

    location = occurence.location
    event = occurence.event
    pricing_string = []

    if occurence.pricing is not None:
        for (tp, price) in occurence.pricing:
            s = tp + '-' + str(price)
            pricing_string.append(s)

    insertOccurenceSQL = """
        INSERT INTO occurence (event, location_name, location_street,
            location_number, date, pricing)
            VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}')
            ON CONFLICT DO NOTHING;
    """.format(event.link, location.name, location.street, location.number,
               occurence.date, "\n".join(pricing_string))

    cur.execute(insertOccurenceSQL)
    conn.commit() # commit saves changes to the database


def updateDB(verbose=False):
    """
    Insert new occurences, locations and events.
    By default, it only prints events that haven't been correctly inserted
        into the database, which can be changed with the verbose parameter
    """

    robot = Robot.Robot()
    occurences = robot.scrapeAll()

    for occurence in occurences:
        try:
            if occurence.location is not None:
                insertLocation(occurence.location)
                insertOccurence(occurence)
            insertEvent(occurence.event)
            if verbose:
                print("Event added with success: \n", occurence, sep="")
        except Exception:
            traceback.print_exc(file=sys.stdout)
            print(occurence)


def test():
    # Tests the database
    # OBS: The database has changed; this probably needs to be modified
    mockLocation = Location.Location('festao', 'mock_rua', 123, 'centro')
    mockEvent = Event.Event('titulo', 'uma descricao qualquer', 1,
                [("gabriel", "protagonista"), ("bruno", "coadjuvante")],
                "https://um.site.qualquer")
    mockOccurence = Occurence.Occurence(mockEvent, dt.date(1998, 9, 27),
                    mockLocation, [('inteira', 10), ('meia', 5)])

    insertLocation(mockLocation)
    insertEvent(mockEvent)
    insertOccurence(mockOccurence)


# Calling this file directly starts this test
if __name__ == "__main__":
    updateDB()
