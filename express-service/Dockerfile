FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["node", "src/app.js"]