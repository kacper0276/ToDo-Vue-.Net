# Używamy obrazu Node.js w wersji 20 jako podstawy
FROM node:20-alpine

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie package.json oraz yarn.lock do katalogu roboczego
COPY package.json yarn.lock ./

# Instalacja zależności
RUN yarn install

# Kopiowanie wszystkich plików aplikacji do katalogu roboczego
COPY . .

# Ekspozycja portu 5173 dla Vite
EXPOSE 5173

# Uruchomienie aplikacji za pomocą Vite
CMD ["yarn", "dev", "--host"]
