FROM node:16

WORKDIR /app
COPY package.json .
RUN npm install
COPY . . 
EXPOSE 2500
VOLUME ["/app/node_modules"]
CMD ["npm","start"]