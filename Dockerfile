FROM node:22-alpine

WORKDIR /app

COPY package*.json .

# you moved this here, if it dosent work move below copy
RUN npm install -g typescript

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]