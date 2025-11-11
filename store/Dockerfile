FROM node:20-alpine
WORKDIR /app
COPY store/package*.json ./
RUN npm install --legacy-peer-deps
COPY store/ ./
RUN npm run build
EXPOSE 8080
ENV PORT=8080
CMD ["npm", "run", "start"]
