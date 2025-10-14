# Stage 1 — Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json tsconfig.json ./
RUN npm install

# Copy all source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2 — Run stage
FROM node:18-alpine

WORKDIR /app

# Copy only needed files for production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Set environment
ENV NODE_ENV=production

# Expose backend port
EXPOSE 5000

# Start the app
CMD ["node", "dist/src/server.js"]
