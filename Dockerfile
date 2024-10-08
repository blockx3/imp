FROM node:20-alpine AS base

# Stage 1: Install dependencies
FROM base AS installer

WORKDIR /usr/src/app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./

RUN \
    if [ -f package-lock.json ]; then \
    npm ci --ignore-scripts; \
    else \
    echo "package-lock.json not found" && exit 1; \
    fi

# Stage 2: Build stage
FROM base AS builder
WORKDIR /usr/src/app

COPY --from=installer /usr/src/app/node_modules ./node_modules
COPY prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm install sharp && npm run build

# Stage 3: Run stage
FROM base AS runner
WORKDIR /usr/src/app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# In future if you want to add public files to your app
# COPY --from=builder usr/src/app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

EXPOSE 3000

# For Standalone build
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD [ "node", "server.js" ]