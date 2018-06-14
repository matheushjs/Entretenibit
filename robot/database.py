import sys
import traceback

import datetime as dt
import psycopg2 # possibly for database connection

import Robot
import Occurence
import Event
import Location



# This file contains the functions for database interfacing



# Converts from number to string event type
def convert_event_type(num_type):
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
def get_occurences():
    robot = Robot.Robot()
    return robot.scrape_all()

def insert_location(location):
    conn = connect()
    cur = conn.cursor()

    insert_location_sql = """
        INSERT INTO location (name, street, number, district)
            VALUES ('{0}', '{1}', {2}, '{3}')
            ON CONFLICT DO NOTHING;
    """.format(location.name, location.street,
               location.number, location.district)

    cur.execute(insert_location_sql)
    conn.commit() # commit saves changes to the database

def insert_event(event):
    conn = connect()
    cur = conn.cursor()

    # cast people need special handling for insertion on the database
    event_casting = [""] if event.cast is None else ["-".join(x) for x in event.cast]

    insert_event_sql = """
        INSERT INTO event (title, description, casting, link)
            VALUES ('{0}', '{1}', '{2}', '{3}')
            ON CONFLICT DO NOTHING;
    """.format(event.title, event.description, "\n".join(event_casting), event.link)

    cur.execute(insert_event_sql)
    conn.commit() # commit saves changes to the database


def insert_occurence(occurence):
    conn = connect()
    cur = conn.cursor()

    location = occurence.location
    event = occurence.event
    pricing_string = []

    if occurence.pricing is not None:
        for (occ_type, price) in occurence.pricing:
            print(occ_type, price)
            temp_s = occ_type + '-' + str(price)
            pricing_string.append(temp_s)

    insert_occurence_sql = """
        INSERT INTO occurence (event, location_name, location_street,
            location_number, date, pricing)
            VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}')
            ON CONFLICT DO NOTHING;
    """.format(event.link, location.name, location.street, location.number,
               occurence.date, "\n".join(pricing_string))

    cur.execute(insert_occurence_sql)
    conn.commit() # commit saves changes to the database


def update_db(verbose=False):
    """
    Insert new occurences, locations and events.
    By default, it only prints events that haven't been correctly inserted
        into the database, which can be changed with the verbose parameter
    """

    robot = Robot.Robot()
    occurences = robot.scrape_all()
    errors = 0

    for occurence in occurences:
        try:
            if occurence.location is not None:
                insert_location(occurence.location)
                insert_occurence(occurence)
            insert_event(occurence.event)
            if verbose:
                print("Event added with success: \n", occurence, sep="")
        except Exception:
            errors += 1
            traceback.print_exc(file=sys.stdout)
            print(occurence)

    print(len(occurences)-errors, "events were found and potentially added " +
          "to the database if they were not duplicates")
    print("There were", errors, "errors.")


def test():
    # Tests the database
    # OBS: The database has changed; this probably needs to be modified
    mock_location = Location.Location('festao', 'mock_rua', 123, 'centro')
    mock_event = Event.Event('titulo', 'uma descricao qualquer', 1,
                             [("gabriel", "protagonista"), ("bruno", "coadjuvante")],
                             "https://um.site.qualquer")
    mock_occurence = Occurence.Occurence(mock_event, dt.date(1998, 9, 27),
                                         mock_location, [('inteira', 10), ('meia', 5)])

    insert_location(mock_location)
    insert_event(mock_event)
    insert_occurence(mock_occurence)


# Calling this file directly starts this test
if __name__ == "__main__":
    update_db()
