ARG PORT=8080

FROM node:11

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

ENV NODE_ENV=production

EXPOSE ${PORT}

COPY . .

CMD [ "npm", "run", "build" ]
CMD [ "npx", "http-server", "./build" ]
