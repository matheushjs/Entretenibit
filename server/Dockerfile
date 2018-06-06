FROM alpine:3.7

MAINTAINER "gabs.oficial98@gmail.com"

WORKDIR /server

COPY . /server

RUN apk update && apk add yarn

RUN yarn install
