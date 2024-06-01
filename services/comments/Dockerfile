FROM node:alpine

# set name of working directory. all following commands will be based off that directory
WORKDIR /app
# copy package.json to the working directory 
COPY package.json ./  
# then run the command
RUN npm install
# copy the remaining files from your local to working directory
COPY ./ ./

CMD ["npm", "start"]