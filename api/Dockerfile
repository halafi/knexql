FROM node:11

WORKDIR /usr/src/api

COPY package.json .

RUN npm install

ENV NODE_ENV=production

EXPOSE 8000

COPY . .

CMD [ "npm", "run", "server" ]
