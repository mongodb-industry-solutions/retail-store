FROM node:20-alpine
RUN mkdir /app
COPY package.json /app/
WORKDIR /app
COPY . ./

ENV IST_SHARED_MONGODB=mongodb+srv://luca:abba@ist-shared.n0kts.mongodb.net/?retryWrites=true&w=majority

RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run","start"]