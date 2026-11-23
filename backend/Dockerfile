FROM node:22-bookworm-slim
WORKDIR /app
COPY backend/package*.json ./backend/
RUN npm ci --prefix backend
COPY backend ./backend
RUN npm run build --prefix backend && mkdir -p /app/data
ENV NODE_ENV=production PORT=3001 DB_FILE=/app/data/portfolio.sqlite
EXPOSE 3001
CMD ["npm","run","start","--prefix","backend"]
