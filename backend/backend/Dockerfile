# Etap budowy
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plików projektu i przywracanie zależności
COPY *.csproj ./
RUN dotnet restore

# Kopiowanie wszystkich plików i budowanie aplikacji
COPY . ./
RUN dotnet publish -c Release -o /app/out

# Etap uruchamiania
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie zbudowanej aplikacji z etapu build
COPY --from=build /app/out .

# Ekspozycja portu
EXPOSE 5252

# Uruchomienie aplikacji
ENTRYPOINT ["dotnet", "backend.dll"]
