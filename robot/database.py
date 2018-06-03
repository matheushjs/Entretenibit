import Robot
import Occurence
import Event
import Location
import psycopg2 # possibly for database connection
import sqlite3 # for executing sql queries


"""
Inserts occurences of events on the database

"""

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
    rb = Robot.Robot()
    return rb.scrapeAll()

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
    conn.commit()

def insertEvent(event):
    conn = connect()
    print(conn)
    exit()
    cur = conn.cursor()

    insertEventSQL = """
        INSERT INTO event (title, description, eventType, casting, link)
            VALUES ('{0}', '{1}', {2}, '{3}', '{4}')
            ON CONFLICT DO NOTHING;
    """.format(event.title, event.description, event.eventType,
            str(event.cast), event.link)

    cur.execute(insertEventSQL)
    conn.commit()


# Insert new occurences, locations and events
def updateDB(occurences):
    pass

if __name__ == "__main__":
    mockLocation = Location.Location('festao', 'mock_rua', 123, 'centro')
    mockEvent= Event.Event('titulo', 'uma descricao qualquer', 1,
            [("gabriel", "protagonista"), ("bruno", "coadjuvante")],
            "https://um.site.qualquer")
    #occurences = getOccurences()
    insertLocation(mockLocation)
    insertEvent(mockEvent)

