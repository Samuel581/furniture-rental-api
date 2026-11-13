FROM node:22-slim

WORKDIR /usr/src/app

# Install the pnpm version pinned in package.json's "packageManager" field.
# Using npm directly (instead of corepack) avoids corepack's repeated
# "This project is configured to use pnpm..." banner in the deploy logs.
RUN npm install -g pnpm@10.34.9

# Copy package files and the Prisma schema so dependency install is cached
# independently of source changes.
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate the Prisma client and compile the Nest app into dist/
RUN pnpm prisma:generate && pnpm build

# App reads PORT (Railway injects it), falling back to 3000
EXPOSE 3000

# Apply pending migrations, then start the compiled API
CMD ["sh", "-c", "pnpm prisma:migrate-deploy && node dist/main"]
