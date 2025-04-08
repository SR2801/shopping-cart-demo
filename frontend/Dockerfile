# Use Node.js image
FROM node:22.14.0

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the Angular app
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use nginx to serve the app
FROM nginx:alpine
COPY --from=0 /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
