CREATE TABLE location(
    name VARCHAR(30) NOT NULL,
    street VARCHAR(50) NOT NULL,
    number INTEGER NOT NULL,
    district VARCHAR(10),
    PRIMARY KEY(name, street, number)
);


-- Create EVENT_TYPE type
CREATE TYPE EVENT_TYPE AS ENUM('ACADEMIC', 'MUSICAL', 'THEATER', 'CINEMA');


CREATE TABLE event(
    title VARCHAR(30) NOT NULL,
    description VARCHAR(300) NOT NULL,
    type EVENT_TYPE NOT NULL,
    casting VARCHAR(400),       -- cast is a reserved word
    link VARCHAR(70) NOT NULL,
    PRIMARY KEY(link)
);


CREATE TABLE occurrence(
    event VARCHAR(70) NOT NULL,
    location_name VARCHAR(30) NOT NULL,
    location_street VARHCAR(50) NOT NULL,
    location_number INTEGER NOT NULL,
    date DATE NOT NULL,
    pricing VARCHAR(50),
    PRIMARY KEY(event, date),
    FOREIGN KEY(location_name, location_street, location_number)
        REFERENCES location(name, street, number)
        ON DELETE CASCADE,
    FOREIGN KEY(event) REFERENCES event(link)
        ON DELETE CASCADE
);
