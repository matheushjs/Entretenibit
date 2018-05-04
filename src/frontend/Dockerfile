FROM node:latest

WORKDIR /frontend

ADD index.js package.json /frontend/

RUN npm install

EXPOSE 80

CMD ["node", "index.js"]
