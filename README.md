# 🗂️ Task Manager App

A full-stack task management application built with **Next.js**, **TypeScript**, **MongoDB**, and **Zustand**. The app supports both **admin** and **user** roles, each with specific permissions and views.

---

## 🚀 Features

- 🔐 Register and log in as **admin** or **user**
- 🔒 Protected routes using **middleware** and **JWT**
- 👥 Role-based access control (admin/user)

### ✅ User Functionality
- View tasks assigned to them
- Check off checklist items within tasks
- Mark tasks as completed
- Track task progress visually

### 🛠️ Admin Functionality
- Create, update, and delete tasks
- Assign tasks to users
- Manage team members

---

## 🛠 Tech Stack

| Technology        | Purpose                                 |
|------------------|------------------------------------------|
| Next.js          | React framework with SSR/API support     |
| TypeScript       | Type safety throughout the app           |
| MongoDB          | NoSQL database                           |
| Mongoose         | Object data modeling for MongoDB         |
| Zustand          | Lightweight global state management      |
| Tailwind CSS     | Utility-first CSS styling                |
| React-Toastify   | Toast notifications                      |
| jose             | JWT decoding & verification              |

---

## 📦 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. **Install dependencies**
```bash
npm install
```
3. **Create .env.local**
```bash
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

4. **Run the development server**
```bash
npm run dev
```


🌐 Deployment
You can deploy this project easily on:

Vercel

Netlify

Render

Just make sure to add your environment variables to the platform settings.

🧑‍💻 Author
Built by AZIZ HAMDI
LinkedIn: https://www.linkedin.com/in/aziz-hamdi-837175286/



