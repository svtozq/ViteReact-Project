# React build step
FROM node:20-alpine AS build

# Working file
WORKDIR /app

# Copy the dependency files
COPY package*.json ./

# Install the dependencies
RUN npm install
RUN npm install prop-types


# Copy the rest of the code
COPY . .

# React application build
RUN npm run build

# Nginx server step
FROM nginx:alpine

# Copy React build to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx starts automatically
