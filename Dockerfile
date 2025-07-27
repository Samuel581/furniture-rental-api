FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy prisma schema
COPY prisma ./prisma/

# DEBUG: Check what got copied
RUN echo "=== Checking prisma folder ==="
RUN ls -la prisma/
RUN echo "=== Checking migrations folder ==="
RUN ls -la prisma/migrations/

# Copy source code
COPY . .

# Build the application (this creates the dist folder)
#RUN yarn build

# Check if dist folder was created
#RUN ls -la dist/

# Expose port
EXPOSE 3001