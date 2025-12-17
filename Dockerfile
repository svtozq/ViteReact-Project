# Étape de build React
FROM node:18-alpine AS build

# Dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Build de l'application React
RUN npm run build

# Étape serveur Nginx
FROM nginx:alpine

# Copier le build React vers Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Nginx se lance automatiquement
