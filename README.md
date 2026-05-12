# Inventory Management System
Team Details:
Vaibhav Rana(2210992488)

Project Title: 
Inventory-Management-System(MERN)

Type:
Research Paper

A web app to help you manage your products, sales, purchases, and sellers — all in one place.



---
## Live Link

To view the website click on the link below or copy paste in your search engine
```
https://inventory-management-system-vert-theta.vercel.app
```

## Built With

- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React, Redux, Ant Design, Recharts

---

## What You Can Do

- **Sign up / Log in** — Create an account or log into an existing one
- **Edit your profile** — Update your info or change your password
- **Products** — Add, edit, delete, search, and filter your products. You can also create product variants and record sales
- **Sales** — View, update, or delete sale records
- **Purchases** — View, update, or delete purchase records
- **Sellers** — Add and manage your sellers
- **Categories & Brands** — Organize products by category and brand
- **Sales History** — See a breakdown of your sales by day, week, month, or year

---

## How to Run It Locally

### 1. Set up the backend (server)

Go into the `server` folder and create a file called `.env` with the following:

```
NODE_ENV=dev
PORT=8000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=any_secret_word_you_choose
```

Then install and start the backend:

```bash
cd server
npm install
npm run dev
```

### 2. Set up the frontend (client)

Go into the `client` folder and create a file called `.env` with the following:

```
VITE_BASE_URL=http://localhost:8000/api/v1
```

Then install and start the frontend:

```bash
cd client
npm install
npm run dev
```

### 3. Open the app

Once both are running, open your browser and go to:
```
http://localhost:5173
```

---

> 💡 **Tip:** You'll need [Node.js](https://nodejs.org) and either a local MongoDB installation or a free [MongoDB Atlas](https://www.mongodb.com/atlas) account to get started.
