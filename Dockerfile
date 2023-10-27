FROM node:18-alpine
ENV PORT=5001

WORKDIR /app
COPY . .

COPY package.json .
RUN npm install
RUN npm rebuild bcrypt

EXPOSE $PORT
CMD npm run start