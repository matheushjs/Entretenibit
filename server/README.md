# Usage

## Install

You can use _yarn_ or _yarn install_

```bash
$ sudo yarn install
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


## Run
To run in development mode use _yarn run dev_ or _yarn dev_ 

```bash
$ yarn dev 
```