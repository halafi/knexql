ARG PORT=8000

FROM node:11

WORKDIR /usr/src/api

COPY package.json .

RUN npm install

ENV NODE_ENV=production

EXPOSE ${PORT}

COPY . .

CMD [ "npm", "run", "server" ]
