FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5555

CMD ["npm", "run", "dev", "--", "--host"]