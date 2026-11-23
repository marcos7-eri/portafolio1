FROM node:22-bookworm-slim
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN npm ci --prefix frontend
COPY frontend ./frontend
ENV API_INTERNAL_URL=http://backend:3001
RUN npm run build --prefix frontend
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm","run","start","--prefix","frontend"]
