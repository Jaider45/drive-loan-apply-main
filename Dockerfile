### Multi-stage Dockerfile: build frontend with Vite, then run Node server to serve API + static files
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY .npmrc ./
RUN npm ci --omit=dev || true
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/routes ./routes
COPY --from=build /app/uploads ./uploads
EXPOSE 5000
CMD ["node", "server.js"]
