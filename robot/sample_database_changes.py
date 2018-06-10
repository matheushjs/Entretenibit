import database

def main():
    connection = database.connect()
    current = connection.cursor()
    
    # Change title size
    command = "ALTER TABLE event ALTER COLUMN title TYPE VARCHAR(150);"
    current.execute(command)
    connection.commit()

    # Change link size
    command = "ALTER TABLE event ALTER COLUMN link TYPE VARCHAR(150);"
    current.execute(command)
    connection.commit()

if __name__ == "__main__":
    main()
