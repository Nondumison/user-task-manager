
# FROM node:18-alpine AS builder

# WORKDIR /app
# RUN mkdir -p /app

# # Copy the DB into that directory
# COPY app/database.sqlite /app/database.sqlite

# COPY package*.json ./
# COPY tsconfig.json ./

# RUN npm install

# COPY src ./src

# RUN npm run build && \
#     ls -la /app/dist && \
#     [ -f /app/dist/server.js ] || (echo "Build failed" && exit 1)

# FROM node:18-alpine
# WORKDIR /app
# RUN apk add --no-cache curl

# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist


# EXPOSE 3001
# CMD ["node", "dist/server.js"]


# ---------- Builder Stage ----------
    FROM node:18-alpine AS builder

    WORKDIR /app
    
    # Copy package files and install dependencies first (cache-friendly)
    COPY package*.json ./
    COPY tsconfig.json ./
    RUN npm install
    
    # Copy the source code
    COPY src ./src
    
    # Build the project
    RUN npm run build && \
        ls -la /app/dist && \
        [ -f /app/dist/server.js ] || (echo "Build failed" && exit 1)
    
    # ---------- Production Stage ----------
    FROM node:18-alpine
    
    WORKDIR /app
    RUN apk add --no-cache curl
    
    # Copy built files and dependencies from builder
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/dist ./dist
    
    # NOTE: We do NOT copy the database file here.
    # The database file will be provided at runtime via a volume.
    
    EXPOSE 3001
    
    CMD ["node", "dist/server.js"]
    