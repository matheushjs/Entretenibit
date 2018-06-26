import sys
import os
import smtplib  # e-mail library
import traceback
import hashlib  # Hashing algorithms
from urllib.parse import urlencode  # Build URL query strings

# For using utf-8 characters in the e-mail
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import database


# Constants
GMAIL_SERVER = 'smtp.gmail.com:587'

START_MESSAGE = "Olá{name}! Você tem {amount_events} eventos" + \
                 " essa semana de interesse:\n\n\n"
    # Not having a space is intended for dealing with users without a name.
    #       The space is added later
    # Also, breaking the text up with a "+" is necessary to avoid tabs in the email

END_MESSAGE = "\n\nNâo quer mais receber esses e-mails? Clique aqui para sair: {link}"
EVENT_SEPARATOR = "\n\n"
SUBJECT = "Eventos dessa semana"


# Various variables for dealing with the users information
EMAIL = 0
NAME = 1
SEARCH = 2
BOOL_ACADEMIC = 3
BOOL_MUSIC = 4
BOOL_THEATER = 5
BOOL_OTHERS = 6
PRICE_MIN = 7
PRICE_MAX = 8
DATE_MIN = 9
DATE_MAX = 10


def read_email_info():
    """
    Reads confident e-mail info from our file.
    Not hardcoded for security.
    """
    with open(".email_info", "r") as email_file:
        username, password, salt = [x.rstrip() for x in email_file.readlines()]
    username = username[username.index("'") + 1:-1]
    password = password[password.index("'") + 1:-1]
    salt = salt[salt.index("'") + 1:-1]
    return username, password, salt


def connect_email_server(username, password):
    """
    Connects to our e-mail server
    """
    server = smtplib.SMTP(GMAIL_SERVER)
    server.ehlo()
    server.starttls()
    server.login(username, password)
    return server


def get_all(connection, table_name):
    """
    Gets all the tuples of a given table in our database
    """
    cur = connection.cursor()
    query = """
        SELECT * FROM {};
        """.format(table_name)

    cur.execute(query)
    return cur.fetchall()


def send_email(user_info, events, server, from_address):
    """
    Sends a e-mail to our user with the events he is interested in.
    """

    # Deals with unnamed users
    name = " " + user_info[NAME] if user_info[NAME] not in "Unnamed User" else ""

    # Joins all the events in one single string
    text = START_MESSAGE.format(name=name, amount_events=len(events))
    for title, _, _, link, _ in events:
        text += "{}\n\t{}".format(title, link) + EVENT_SEPARATOR
    text += END_MESSAGE.format(link=get_unsubscribe_link(user_info))

    message = MIMEMultipart()
    message['From'] = from_address
    message['To'] = user_info[EMAIL]
    message['Subject'] = SUBJECT
    message.attach(MIMEText(text))

    # Send the e-mail and return error
    errors = server.sendmail(from_address, user_info[EMAIL], message.as_string())
    return errors


def get_unsubscribe_link(user_info):
    email = user_info[EMAIL].encode('utf8')
    
    # Get the salt
    _, _, salt = read_email_info()
    salt = salt.encode('utf8')
    
    string = email + salt
    hashing = hashlib.sha256(string)

    print('localhost:5000/unsubscribeUser?' + urlencode({
        'email': email,
        'hash': hashing.hexdigest()}
        ))

    return 'localhost:5000/unsubscribeUser?' + urlencode({
        'email': email,
        'hash': hashing.hexdigest()}
        )


def user_has_interest(user, event):
    return True


def print_errors(errors, verbose, email_errors):
    """
    There are two type of errors:
        Serious: Errors in the programming/connections
        Non Serious: The e-mail was declined
    The non serious can be due to the user having written the wrong e-mail
        or him having deleted the e-mail
    """

    # SERIOUS errors, that should definitely be looked at
    if errors:
        print("There were {} SERIOUS errors.")
    else:
        print("No serious errors happenned :)")

    # Non serious errors
    if email_errors:
        print("There were {} light errors. This can mean that the user gave\
              us a invalid e-mail or that he has deleted his e-mail,\
              among other things. Unless there were a lot, we should not worry"\
              .format(len(email_errors)))
        if not verbose:
            print("Run me again with the verbose option to view the errors.")
        else:
            for error in email_errors:
                print(error)


def main(verbose=False):
    """
    Main logic for going through our database and sending e-mails to the righ users.
    """

    # Initial connection
    connection = database.connect()
    username, password, _ = read_email_info()
    server = connect_email_server(username, password)

    # Get information from database
    events = get_all(connection, "event")
    users = get_all(connection, "users")

    # Log errors here
    errors = 0
    sucess = 0
    wrong_emails = []

    # For each user, send the e-mail and log errors
    try:
        for user in users:
            interest_events = []

            # Find out all the events the user is interested in
            for event in events:
                if user_has_interest(user, event):
                    interest_events.append(event)

            if interest_events:
                # Sent emails is a list of all the emails that did not send.
                # In our case it can either be a empty list or have 1 e-mail.
                email_errors = send_email(user, interest_events, server, username)
                if not email_errors:
                    sucess += 1
                else:
                    wrong_emails.append([user, interest_events])

    except Exception:
        errors += 1
        traceback.print_exc(file=sys.stdout)
        print(user, interest_events)

    # Prints results
    print("{} emails were sent!".format(sucess))
    print_errors(errors, verbose, wrong_emails)


# Calling this file directly sends the emails
if __name__ == "__main__":
    main()
