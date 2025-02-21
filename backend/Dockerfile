FROM node:latest
WORKDIR /usr/src
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]