FROM node:lts-alpine

# FROM cgayatri123/nasa-project
WORKDIR /app

COPY package*.json ./

COPY nasa-client/package*.json client/
RUN npm run install-client --only=production

COPY server/package*.json server/ 
RUN npm run install-server --only=production

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 5252 