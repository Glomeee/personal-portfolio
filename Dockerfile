# ------------------------------------------------------
# Autor: Luka Glomazić
# Projekt: Portfolio Website
# Kolegij: MMOS 25/26
# Opis:
# Docker image služio kao poslužitelja za portfolio
# stranicu koristeći Nginx na Alpine Linuxu.
# ------------------------------------------------------

FROM nginx:alpine

# Uklanjanje zadane nginx web stranice
RUN rm -rf /usr/share/nginx/html/*

# Kopiranje projektnih datoteka u nginx web direktorij
COPY . /usr/share/nginx/html

# eksportanje port-a 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
