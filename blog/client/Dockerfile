FROM node:alpine
 
# Add the following lines to work around the bug with react-create-app
ENV CI=true
ENV WDS_SOCKET_PORT=0
 
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["echo", "Hello"]
CMD ["npm", "start"]
