FROM node:10

MAINTAINER mhjsaldanha@gmail.com

WORKDIR /frontend

COPY build.bash index.js package.json /frontend/
COPY main-page/ /frontend/main-page

RUN bash build.bash
RUN npm install

EXPOSE 80

CMD ["node", "index.js"]
