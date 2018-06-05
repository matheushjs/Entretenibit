# Usage

## Installation

If you'd like to install the server out of a container can use _yarn_ or _yarn install_

```bash
$ sudo yarn install
```

Or you can install it inside a docker container (if you don't have docker installed already, check out the [Docker Installation Guide](https://docs.docker.com/install/))


```bash
$ docker image build -t server .
```

## Connection
For a security reason, the information to connect to the database isn't in the code. Instead, you have to create a file called _.env_ and put the information there

Here it's an example of how it should look:

```
USERNAME='postgres'
HOST='localhost'
DATABASE='entretenibit'
```
But these are not the acctual variables to use. See Documents/Tutorial for more information


## Running
To run in development mode use _yarn run dev_ or _yarn dev_

```bash
$ yarn dev
```

Or, if you're running it from inside of a container

```bash
$ docker container run server yarn dev
```

Or simply


```bash
$ docker run --detach server yarn dev
```