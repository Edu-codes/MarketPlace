# 🛒 MarketPlace

Este es un proyecto de ecommerce desarrollado con React y .NET 8, que permite gestionar productos, usuarios, y realizar compras a través de una interfaz moderna y fácil de usar.

## 📦 Tecnologías utilizadas

- ⚛️ React + Vite (Frontend)
- 🧾 Axios (para consumo de APIs)
- 📖 Libreria MUI para componentes personalizados
- ⚠️ SweetAlert2 para manejo de alertas
- 🧑‍💻 .NET 8 Web API (Backend)
- 🗃️ SQL Server (Base de datos)
- 🔐 Autenticación y Autorizacion con JWT
- 🧠 React Context API y Hooks personalizados

## 🚀 Funcionalidades principales

- Registro e inicio de sesión de usuarios
- Visualización de productos por categorías
- Carrito de compras por usuario
- Gestión de pedidos
- Administración de productos (CRUD)

## 📂 Como Ejecutar:
Este repositorio contiene un frontend en React y un backend de .NET WebAPI. Para un correcto funcionamiento asegurate de tener todas las herramientas instaladas

## ⚙️ Inicializar Base de Datos

Después de clonar el repositorio, ejecutá los siguientes comandos:

```bash
dotnet ef database update

### 🧐 Requisitos

- SQL Server.
- Tener node.js para instalar dependencias del proyecto de React. 
- .NET SDK (Este proyecto es compatible con la version 8 de .NET)

### React-MP
- Puedes usar Visual Studio Code para abrir el proyecto
- Abre la terminar y escribe "npm install"
- Ejecuta npm run dev 

### WebApi-MP
- Abre la Solucion de la carpeta WebApi-MP con .net
- instala EF Core (dotnet tool install --global dotnet -ef)
- Configura la cadena de conexion en appsettings
**Abre la terminal y ejecuta**
- dotnet restore
- dotnet ef database update
- dotnet run

🤓 Y listo.

    
## 🧑‍💻 Realizado por:
 Daniel Eduardo - @Edu-Codes


## 📂 Estructura del repositorio

Edu-codes/
├── MarketPlace/
│   ├── React-MP/           # React App (Vite)
│   └── WebApi-MP/          # API .NET Core 8



