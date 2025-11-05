# GameVault 🎮

A full-stack game store application built with React and Spring Boot.

## Project Structure

```
GameVault/
├── client/          # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── server/          # Spring Boot backend
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Java** (JDK 17 or higher)
- **Maven** (for backend build)

### 🎯 Frontend Setup (React)

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit: `http://localhost:5173`

### ⚙️ Backend Setup (Spring Boot)

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Run the Spring Boot application:

   ```bash
   ./mvnw spring-boot:run
   ```

   Or if you're on Windows:

   ```bash
   mvnw.cmd spring-boot:run
   ```

3. The backend API will be available at: `http://localhost:8080`

## 🛠️ Available Scripts

### Frontend (client/)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (server/)

- `./mvnw spring-boot:run` - Run the application
- `./mvnw clean install` - Clean and build the project
- `./mvnw test` - Run tests

## 🌟 Features

- **Frontend**: Modern React app with Vite
- **Backend**: RESTful API with Spring Boot
- **Authentication**: User login and signup
- **Game Management**: Browse and manage games
- **Shopping Cart**: Add games to cart
- **Wishlist**: Save games for later

## 🔧 Development

### Running Both Frontend and Backend

1. Start the backend first:

   ```bash
   cd server
   ./mvnw spring-boot:run
   ```

2. In a new terminal, start the frontend:

   ```bash
   cd client
   npm run dev
   ```

3. The frontend will proxy API requests to the backend automatically.

## 📁 Key Directories

- `client/src/components/` - React components
- `client/src/pages/` - Page components
- `client/src/api/` - API service functions
- `client/src/contexts/` - React context providers
- `server/src/main/java/com/example/server/` - Java source code
- `server/src/main/resources/` - Configuration files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🎮 Happy Gaming!

Enjoy building and using GameVault!
