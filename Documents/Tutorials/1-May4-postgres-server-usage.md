Postgres Database Server Usage Guide
===

This document shows how the postgres server I'm hosting in my own computer can be used.

### 1) Install Postgres client command

Ensure you can execute the `psql` command. For this, you can run

	sudo apt install postgresql

### 2) Find my machine's IP

Either run the command

	curl mjsaldanha.com/myip

or access [the link](https://www.mjsaldanha.com/myip) on your browser and copy and paste the IP address.

### 3) Check if it works on your command line

Verify if the following command works in your command line:

	psql -U entretenibit -h [MY IP]

Your terminal should switch to a postgres prompt.

Press `CTRL + D` or `CTRL + C`to exit the prompt.

### 4) Connect to the server through javascript/python libraries

If we use the `pg` postgres library for javascript, you can connect to my server using something similar to what follows.

```javascript
const { Client } = require('pg');
const client = new Client({
  connectionString: "postgres://entretenibit@[MY IP]/entretenibit",
  ssl: true
});

client.connect();

module.exports = {
  client: client
}
```
