# Front-end DOCKERFILE
In order to containerize the front-end, just run
```
docker build -t <tag>:<version> .
```
inside this directory, where "tag" and "version" is up to you.

# RUN
```
docker run -d -p 3000:3000 <tag>:<version>
```
Note that the flag "-d" means that the container will begin in "detached" (background) mode, so you should will receive a docker hash after running your program. After that, you can test the frontend structure on your localhost at port 3000.
