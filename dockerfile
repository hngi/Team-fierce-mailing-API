FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
EXPOSE 6060
CMD ["npm", "start"] 