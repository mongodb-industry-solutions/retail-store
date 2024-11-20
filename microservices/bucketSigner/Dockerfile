FROM node:20
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ .
EXPOSE 3456
CMD ["npm", "start"]
