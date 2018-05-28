FROM node:10

MAINTAINER mhjsaldanha@gmail.com

WORKDIR /frontend

COPY index.js package.json /frontend/

RUN bash build.bash
RUN npm install

EXPOSE 80

CMD ["node", "index.js"]
