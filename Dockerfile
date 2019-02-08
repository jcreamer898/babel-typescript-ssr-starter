FROM node:10

RUN mkdir -p /code

WORKDIR /code

COPY package.json .

RUN npm install -q

COPY . /code

RUN npm run build
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "run", "start"]