# 🔗 URL Shortener App

A simple and secure URL shortening web application built using **Node.js**, **Express**, and **MongoDB**, with **EJS** as the templating engine.

## ✨ Features

- ✅ User **registration** and **login**
- ✅ JWT-based **authentication** with **secure cookies**
- ✅ Shorten any long URL and get a custom short link
- ✅ Each user can only see their own shortened URLs
- ✅ Fully server-side rendered using EJS
- ✅ Clean UI with URL history table

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Backend runtime |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **EJS** | View engine (server-side rendering) |
| **JWT** | Token-based authentication |
| **Cookies** | Store JWT tokens on the client |
| **dotenv** | Environment variable management |
| **Nodemon** | Auto-restarting server for development |

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/shorten-url-app.git
cd shorten-url-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file**

```bash
touch .env
```

And add the following environment variables:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. **Run the app**

```bash
npm run dev
```
Then open your browser at: http://localhost:8000

## 🧪 How It Works

1. User signs up or logs in.
2. JWT token is generated and stored in an HTTP-only cookie.
3. After login, user is redirected to the home page.
4. On the home page:
    - Paste any long URL into the input field.
    - It gets converted into a short URL.
    - Below the input, a table displays all URLs shortened by the user.
5. Shortened URLs can be visited and tracked.

## 📁 Project Structure

```bash
├── config/
│   └── database.js       # MongoDB connection
├── controllers/
│   └── userController.js # Signup & login logic
│   └── urlController.js  # URL shortening logic
├── middlewares/          # middlewares logic
│   └── authMiddleware.js
├── routes/
│   └── userRoute.js      # Auth routes
│   └── urlRoute.js       # URL handling routes
│   └── staticRouter.js   # Home, login, signup pages
├── models/
│   └── userModel.js
│   └── urlModel.js
├── service/
│   └── auth.js
├── views/
│   └── home.ejs          # EJS templates for SSR
│   └── login.ejs 
│   └── signup.ejs 
├── public/
│   └── style.css         # Static CSS file
├── index.js              # Entry point
├── .env
└── README.md
```

## 🔐 Security Notes

- JWT tokens are stored securely in HTTP-only cookies.
- Passwords should ideally be hashed using bcrypt (consider adding this).
- Input fields are validated server-side.

## 🙌 Contribution

Feel free to open issues or submit pull requests if you’d like to contribute or improve the app!

## 📄 License

This project is open-source and available under the MIT License.
