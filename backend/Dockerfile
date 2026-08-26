FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG MEDUSA_BACKEND_URL
ARG STORE_CORS
ARG ADMIN_CORS
ARG AUTH_CORS
ARG DISABLE_MEDUSA_ADMIN=false
ENV MEDUSA_BACKEND_URL=$MEDUSA_BACKEND_URL \
    STORE_CORS=$STORE_CORS \
    ADMIN_CORS=$ADMIN_CORS \
    AUTH_CORS=$AUTH_CORS \
    DISABLE_MEDUSA_ADMIN=$DISABLE_MEDUSA_ADMIN
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.medusa/server ./
RUN npm install --omit=dev
EXPOSE 9000
CMD ["sh", "-c", "if [ \"$MEDUSA_WORKER_MODE\" = \"server\" ]; then npx medusa db:migrate; fi && npm run start"]
