# Social Media Web Application

A full-stack social media application featuring posts, comments, user profiles, real-time chat, and more.

## 🌐 Live Demo

Visit the application at [https://social-media-neon-five.vercel.app/](https://social-media-neon-five.vercel.app/)

Backend API: [https://social-media-nbs1.onrender.com](https://social-media-nbs1.onrender.com)

## ✨ Features

- **User Authentication**: Secure registration and login
- **User Profiles**: Customizable profiles with bio and profile picture upload[^1][^9]
- **Posts Feed**: View posts from followed users[^2][^6]
- **Post Interaction**: Create posts with images, like and comment on posts[^6][^8]
- **Comments \& Replies**: Threaded comment system with replies[^12]
- **Real-time Chat**: Private messaging between users using Socket.io[^1][^5]
- **Follow System**: Follow/unfollow other users[^8]
- **Responsive Design**: Mobile-friendly interface[^12]


## 🛠️ Technology Stack

### Frontend

- **Vue.js 3**: Frontend framework with Composition API
- **Pinia**: State management
- **Axios**: API requests
- **Socket.io-client**: Real-time communication
- **Font Awesome**: Icon library
- **CSS**: Custom styling with responsive design


### Backend

- **Node.js \& Express**: Server-side framework[^8]
- **MySQL**: Relational database
- **Socket.io**: Websocket server for real-time features
- **JWT**: Authentication with httpOnly cookies[^8]
- **Argon2**: Secure password hashing
- **Multer**: File uploads


## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MySQL Server
- Git


### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/social-media.git
cd social-media
```

2. **Set up the backend**

```bash
cd backend
npm install
```

3. **Configure environment variables**
Create a .env file in the backend directory:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=social_media
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. **Set up the database**
Run the SQL schema in the database directory using your MySQL client.
5. **Set up the frontend**

```bash
cd ../frontend
npm install
```

6. **Configure the frontend API endpoint**
Update the backendURL in auth.js if needed:

```javascript
const backendURL = 'http://localhost:3000';
```

7. **Run the application**

In one terminal (backend):

```bash
cd backend
npm run dev
```

In another terminal (frontend):

```bash
cd frontend
npm run dev
```

8. **Access the application**
Open your browser and navigate to http://localhost:5173

## 📦 Building for Production

### Frontend

```bash
cd frontend
npm run build
```

The build artifacts will be stored in the dist directory.

### Backend

```bash
cd backend
npm run build
```


## 🧪 Project Structure

```
social-media/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── views/
│   │   ├── store/
│   │   ├── router/
│   │   ├── App.vue
│   │   └── main.js
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── package.json
└── README.md
```


## 🔒 Authentication Flow

The authentication uses JWT tokens stored in httpOnly cookies for security:

1. User registers or logs in
2. Server generates a JWT token
3. Token is stored as an httpOnly cookie
4. API requests include this cookie (withCredentials: true)
5. Backend validates the token on protected routes

## 📱 Responsive Design

The application is fully responsive:

- **Desktop**: Full featured with sidebars
- **Tablet**: Modified layout with collapsible elements
- **Mobile**: Optimized single-column view with mobile-friendly navigation


## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.