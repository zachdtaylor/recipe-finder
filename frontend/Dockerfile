# Start with an official node runtime
FROM node:8

WORKDIR /app/

# Install dependencies
COPY package.json yarn.lock /app/

RUN npm install

# Add rest of code
COPY . /app/

EXPOSE 3000

CMD npm start