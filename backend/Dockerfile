
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
    
    # Copy the SQLite database file
    COPY app/database.sqlite ./app/database.sqlite
    
    # Copy config and install deps
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
    
    # Copy everything needed from builder
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/dist ./dist
    
    # 💡 VERY IMPORTANT: Copy the database into the same place it expects to be at runtime
    COPY --from=builder /app/app/database.sqlite ./app/database.sqlite
    
    EXPOSE 3001
    
    CMD ["node", "dist/server.js"]
    
