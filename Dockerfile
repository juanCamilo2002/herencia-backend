FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN apt-get update && apt-get install -y python3 make g++ \
    && npm install --legacy-peer-deps \
    && apt-get purge -y python3 make g++ \
    && apt-get autoremove -y && apt-get clean


COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]