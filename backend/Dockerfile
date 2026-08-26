FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.medusa/server ./
RUN npm install --omit=dev
EXPOSE 9000
CMD ["sh", "-c", "if [ \"$MEDUSA_WORKER_MODE\" = \"server\" ]; then npx medusa db:migrate; fi && npm run start"]
