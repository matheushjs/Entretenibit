CREATE TABLE location(
    name VARCHAR(30) NOT NULL,
    street VARCHAR(50) NOT NULL,
    number INTEGER NOT NULL,
    district VARCHAR(10),
    PRIMARY KEY(name, street, number)
);

CREATE TABLE event(
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    casting VARCHAR(400),
	link VARCHAR(70) NOT NULL,
	id BIGSERIAL,
    PRIMARY KEY(link)
);

CREATE UNIQUE INDEX id_index ON event(id);

CREATE TABLE occurrence(
    event VARCHAR(70) NOT NULL,
    location_name VARCHAR(30) NOT NULL,
    location_street VARCHAR(50) NOT NULL,
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

CREATE table type (
	event INTEGER,
	type TEXT,
	PRIMARY KEY (event, type)
	CONSTRAINT fk_event FOREIGN KEY (event) REFERENCES event(id)
);
