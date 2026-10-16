# Sweet Pink Corner - Backend
Projektuppgift - DT207G

Detta repository innehåller källkod för en REST-webbtjänst utvecklad med Node.js, Express, MongoDB och Mongoose. API:et används för att hantera administratörer, autentisering med JWT samt CRUD-operationer för kaféts produkter.

## Av: Frida Ljungberg, 2026

## Länk
API:et är tillgängligt på följande adress vid lokal körning: 
http://localhost:3001

## Installation
Klona ner källkodsfilerna, kör kommando npm install för att installeranödvändiga npm-paket.

Skapa en .env-fil i projektets rotkatalog:
PORT=3001
DATABAS="mongodb://localhost:27017/sweetpink"
JWT_SECRET_KEY=hemlig_nyckel

## Databas
APIet använder databasen MongoDB tillsammans med Mongoose.

Databasen innehåller två collections:

admins:
- username (String, obligatoriskt, unikt)
- password (String, obligatoriskt, hashas med bcrypt)

products:
- productName (String, obligatoriskt)
- description (String, obligatoriskt)
- price (Number, obligatoriskt)

### Funktionalitet
- Administratörsinloggning
- Generering av JWT-token
- Verifiering av JWT-token
- Skyddade routes
- Skapa produkter
- Hämta produkter
- Uppdatera produkter
- Ta bort produkter
- Validering av produktdata
- Lösenordshashning med bcrypt


### Använding
|Metod  |Endpoint     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|POST   |/api/login |Loggar in en användare och retunerar JWT|
|GET |/api/protected |Skyddad route som kräver giltig JWT|
|GET |/api/products |Hämtar produkter|
|POST |/api/products |Skapar ny produkt|
|PUT |/api/products/:id |Uppdaterar produkt|
|DELETE |/api/products/:id |Tar bort produkt|

### Exempel
Inloggning: 
```
{
    "username": "admin",
    "password": "password"
}
```

Produkt:
```
{
    "productName": "Pink Latte",
    "description": "Latte med jordgubbssmak",
    "price": 49
}
```