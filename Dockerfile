FROM node:18-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY package*.json ./
RUN npm install

COPY . .

# Make sure port matches your application configuration
EXPOSE 3000

CMD ["npm", "start"]