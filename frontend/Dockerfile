# Base image
FROM kkarczmarczyk/node-yarn:8.0-slim

MAINTAINER "blessed.satan@in.fer.no"

# Set working directory
RUN mkdir /usr/src/frontend
WORKDIR /usr/src/frontend

# Add `/usr/src/frontend/node_modules/.bin` to $PATH
ENV PATH /usr/src/frontend/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY . /usr/src/frontend/
RUN yarn install

EXPOSE 3000

# Start app
CMD ["yarn", "start"]
