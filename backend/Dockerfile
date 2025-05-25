# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./
# COPY tsconfig.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 3001

# CMD ["npm", "start"]

FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src

# Build and verify
RUN npm run build && \
    ls -la /app/dist && \
    [ -f /app/dist/server.js ] || (echo "Build failed" && exit 1)

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist


EXPOSE 3001
CMD ["node", "dist/server.js"]
