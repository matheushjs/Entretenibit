#!/bin/bash

cd scraper && docker build . -t scraper && cd ..
cd frontend && docker build . -t frontend && cd ..

docker network create --subnet=172.18.0.0/16 mynet123
docker run --detach --network mynet123 --ip 172.18.0.22 -p8080:80 frontend
docker run --detach --network mynet123 --ip 172.18.0.21 scraper
