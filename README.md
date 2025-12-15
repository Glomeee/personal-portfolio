# MMOS2526 Seminar 1 – portfolio web stranica

**Autor:** Luka Glomazić

**Kolegij:** Mrežni i mobilni operacijski sustavi 2025/26

**Projekt:** Web aplikacija portfolia

## 1. Project Overview

Ovaj projekt je web aplikacija portfolia:

* Osnovnu funkcionalnost HTML-a, CSS-a i JavaScripta
* Korištenje multimedijskog sadržaja i poveznica
* Docker kontejnerizaciju statičke web aplikacije
* Cloud implementaciju korištenjem platforme Render
* CJasnu dokumentaciju radi mogućnosti ponovne reprodukcije projekta

Aplikacija uključuje sljedeće datoteke:

* `index.html` – glavna stranica
* `main.css` – stilovi stranice
* `main.js` – JavaScript 
* `data.json` – jednostavan izvor podataka

## 2. Prerequisites

Prije lokalnog pokretanja projekta potrebno je osigurati:

* [Docker](https://www.docker.com/get-started) Instaliran
* Docker Hub korisnički račun (za objavu imagea)
* GitHub korisnički račun (za cloud implementaciju)

## 3. Docker Image

### 3.1 Dockerfile

Dockerfile gradi kontejner koji poslužuje statičku web stranicu koristeći Nginx.

**Key points:**

* **Base image:** `nginx:alpine`
* **Statičke datoteke kopiraju** se u Nginx web direktorij
* **Port 80**
* **Podaci o autoru i projektu** komentari

**Dockerfile:**

```dockerfile
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
```

### 3.2 Lokalna izgradnja Docker imagea

```bash
docker build -t marjinko/personal-portfolio:latest .
```

### 3.3 pokretanje Docker kontejnera lokalno

```bash
docker run -p 3888:80 marjinko/personal-portfolio:latest
```

Otvorite preglednik i posjetite stranicu:
```
http://localhost:3888
```

## 4. Docker Hub

### 4.1 Objavljivanje imagea na Docker Hub

1. Prijavite se na Docker Hub:

```bash
docker login
```

2. Objavite image:

```bash
docker push marjinko/personal-portfolio:latest
```

**Docker Hub repozitorij:**
[https://hub.docker.com/r/marjinko/personal-portfolio](https://hub.docker.com/r/marjinko/personal-portfolio)

## 5. Cloud implementacija

Aplikacija je implementirana koristeći **Render** izravno iz **GitHub repozitorija**.

### 5.1 Proces implementacije

1. Projekt je postavljen na GitHub repozitorij.
2. Na Renderu je kreiran novi **Web Service**.
3. Odabran je GitHub repozitorij..
4. Render je **automatski prepoznao Dockerfile** u repozitoriju.
5. Nisu bile potrebne ručne Docker naredbe.
6. Servis je implementiran s podrazumijevanim Docker postavkama.

Render automatski gradi Docker image i pokreće kontejner.

### 5.2 Pristup aplikaciji

Nakon implementacije, aplikacija je dostupna na:

**Javni URL:**
https://personal-portfolio-6gs3.onrender.com

## 6. Struktura

```
project/
├─ index.html
├─ css/
  ├─ main.css
├─ js/
  ├─ main.js
├─ database/
  ├─ data.json
├─ img/
  ├─ ...
├─ compose.yaml
├─ Dockerfile
├─ README.md
```