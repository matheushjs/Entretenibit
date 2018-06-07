# Development mode Run
You may run the frontend structure in development mode using Yarn using the following commands:
```
yarn install
yarn start
```
The standard local PORT mapped by yarn is 3000.

# Front-end DOCKERFILE and containerization
In order to containerize the front-end, just run
```
docker build -t <tag>:<version> .
```
inside this directory, where "tag" and "version" is up to you.

# Running within a container
```
docker run -d -p 3000:3000 <tag>:<version>
```
Note that the flag "-d" means that the container will begin in "detached" (background) mode, so you should receive a docker container identification hash after running your program. Then, you can test the frontend structure on your localhost at port 3000.
