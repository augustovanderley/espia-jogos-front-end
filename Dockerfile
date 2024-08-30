# First stage: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Second stage: production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist

RUN npm install -g pm2 serve 

CMD ["pm2-runtime", "serve", "dist", "--spa", "--port", "3000"]

