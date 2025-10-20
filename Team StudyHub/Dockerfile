# Multi-stage build for production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm ci --only=production
RUN cd backend && npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules

# Copy source code
COPY . .

# Generate Prisma client
RUN cd backend && npx prisma generate

# Build the frontend
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY --from=builder /app/backend/prisma ./backend/prisma

# Set proper permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start the application
CMD ["node", "backend/server.js"]