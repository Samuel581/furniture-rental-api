FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install dependencies
RUN corepack enable && pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Expose port
EXPOSE 3001
