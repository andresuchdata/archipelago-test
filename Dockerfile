FROM node:18-alpine

# Set working directory to server folder
WORKDIR /app/server

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy package files from server directory
COPY chat-app/server/package*.json ./

# Install dependencies as root
RUN npm install

# Copy rest of the application
COPY chat-app/server .

# Change ownership of the app directory to appuser
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 3000

CMD ["npm", "start"]