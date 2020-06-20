# Docred-api-backend

## Dependencias

- NPM
- MongoDB
- ExpressJS

## Instalación

Después de descargar el .git ejecutar el instalador de dependencias.

`$ npm install`

## Configuración

En el directorio /app/settings.js están todas las variables a tener en cuenta para correr el proyecto.

- Base de Datos
- Servidor
- Variables Globales (Estado solicitudes)

## Iniciar

Después de instalar las dependencias y ajustar las configuraciones necesarios ejecutar:

`$ npm start`

El servidor correra en la url y puerto definido en la configuración por defecto `http://localhost:3700`

## Endpoints

- /api/users **(Gestión de usuarios)** (GET, POST)
- /api/agents **(Gestión de agentes)** (GET, POST)
- /api/issues **(Gestión de issues)** (GET, POST, PUT)

## Colección de Apoyo (Postman)
https://www.getpostman.com/collections/a1537434f226940b34f5