# Use Node.js 18 LTS which is compatible with Expo SDK 50
FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache \
    bash \
    curl \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Create app directory
WORKDIR /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S expo -u 1001

# Change ownership of the app directory
RUN chown -R expo:nodejs /app
USER expo

# Copy package files
COPY --chown=expo:nodejs package*.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy source code
COPY --chown=expo:nodejs . .

# Expose port for Expo development server
EXPOSE 19000 19001 19006

# Default command
CMD ["npm", "start"]
