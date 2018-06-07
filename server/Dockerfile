FROM alpine:3.7

WORKDIR /server

COPY . /server

RUN apk update && apk add yarn

RUN yarn install
