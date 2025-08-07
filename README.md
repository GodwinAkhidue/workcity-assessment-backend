# 🟢 Node.js API Server

A secure and modular Node.js REST API built with Express, JWT authentication, and PostgreSQL.

## 🚀 Features

- 🔐 User authentication with JWT
- 🔑 Password hashing with bcrypt
- 🗄️ PostgreSQL integration
- 🧪 Modular code structure
- 🌐 CORS-enabled for frontend communication
- 🛠️ Environment variables with `.env` file

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **bcrypt**
- **jsonwebtoken**
- **dotenv**
- **cors**
- **axios**

---

## 🛠 Installation

1. **Clone the repo**

```bash
git clone https://github.com/[your-username]/[your-repo-name].git
cd [your-repo-name]
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
```

4. **Run the server**

```bash
node index.js
```

---

## 📁 Project Structure

```
.
├── controllers/
├── middleware/
├── routes/
├── models/
├── utils/
├── .env
├── index.js
└── package.json
```

---

## 🧪 API Endpoints

| Method | Route           | Description             |
|--------|------------------|-------------------------|
| POST   | `/api/signup`    | Register new user       |
| POST   | `/api/login`     | Authenticate user       |
| GET    | `/api/profile`   | Get user profile (auth required) |

---

## 🧾 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Contributions

Feel free to fork this repo and submit pull requests. Issues and feedback are welcome!