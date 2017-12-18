FROM node:8-alpine

RUN apk add --update git

COPY package.json package-lock.json /app/

RUN cd /app/ && npm install --dev

COPY . /app/

RUN cd /app/ && npm run dist

EXPOSE 8000

CMD cd /app/ && npm start
