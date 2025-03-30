# Unique-6 Mebel Tools

A high-performance online catalog for woodworking tools and machines, built with Next.js 14, React 18, Tailwind CSS 3.4, and TypeScript.  
The project ensures SEO-friendly static generation (SSG) with Incremental Static Regeneration (ISR), enabling fast and efficient content updates.

## 🛠 Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** API Routes (Next.js), Prisma ORM
- **Database:** PostgreSQL (hosted on Neon)
- **Authentication:** Custom cookie-based admin auth
- **Deployment:** Vercel

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/charlestanev/unique-6-mebel-tools.git
cd unique-6-mebel-tools
```

### 2. Install dependencies

```bash
npm install
```

---

### 3. Set up environment variables

Create a `.env` file by copying the provided `.env.example`:

```bash
cp .env.example .env
```

Then fill in the actual values in `.env`:

```env
DATABASE_URL=your_postgres_connection_url
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
SESSION_SECRET=your_secret_key
```

⚠️ **Do not commit `.env` to Git.** It contains sensitive data and is already excluded via `.gitignore`.

---

### 4. Prisma setup

Generate Prisma client:

```bash
npx prisma generate
```

(Optional) Push Prisma schema to your database:

```bash
npx prisma db push
```

---

### 5. Run the development server

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🧪 Project Structure

```
├── prisma/                → Prisma schema and migration config
├── public/                → Static assets
├── src/
│   ├── components/        → Reusable UI components
│   ├── pages/             → Next.js pages (routes)
│   ├── store/             → Global state (if any)
│   ├── styles/            → Global CSS
│   ├── types/             → TypeScript interfaces and types
│   └── utils/             → Helper functions (auth, validation)
├── .env                   → Your local environment variables (not committed)
├── .env.example           → Example env file (safe to commit)
├── .gitignore             → Git ignore rules
├── README.md              → This file
```

---

## 📦 Scripts

| Script        | Description                   |
|---------------|-------------------------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm run start` | Starts the production server |
| `npx prisma ...` | Prisma CLI commands |

---

## 📤 Deployment

This project is **deployed on Vercel** using the default Next.js setup.  
You can deploy your own version by clicking the button below:

👉 [Deploy on Vercel](https://vercel.com/new)

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma ORM Docs](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

## 🙌 Credits

Created by [Charlie Tanev](https://charlestanev.dev)  
GitHub: [github.com/charlestanev](https://github.com/charlestanev)