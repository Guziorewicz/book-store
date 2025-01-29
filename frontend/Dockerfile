FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache chromium \
    && npm install -g @lhci/cli

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5555

CMD ["npm", "run", "dev", "--", "--host"]