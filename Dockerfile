FROM node:8-alpine
RUN apk add --update git
COPY package.json package-lock.json /app/
RUN cd /app/ && npm install
COPY . /app/
RUN cd /app/ && npm run dist
CMD cd /app/ && npm start
EXPOSE 8000
