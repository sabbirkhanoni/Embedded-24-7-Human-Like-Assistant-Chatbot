#  Embedded 24/7 Human-Like Assistant Chatbot

🔗 **Live Demo:** [embedded-24-7-human-like-assistant.vercel.app](https://embedded-24-7-human-like-assistant.vercel.app)

## **The installation guide is provided below, after the User Interface (UI) section.**

<img width="1920" height="4473" alt="screencapture-localhost-3000-2026-04-17-17_42_53" src="https://github.com/user-attachments/assets/d1c284a0-88aa-4413-aece-cd873e97d299" />


<img width="1920" height="927" alt="screencapture-pichatbot-scalekit-dev-a-auth-login-2026-04-12-20_57_42" src="https://github.com/user-attachments/assets/cf29f57a-67b6-4430-a6fe-a6ea1bd46cf1" />


A modern, full-stack AI-powered chatbot application built with **Next.js 16**, **OpenAI**, **Drizzle ORM**, and **Neon PostgreSQL** — designed to deliver a human-like conversational experience around the clock. Secured with **ScaleKit** authentication and styled with **shadcn/ui** and **Tailwind CSS v4**.



---

##  Project Overview

This project is a production-ready, embeddable AI assistant chatbot that provides 24/7 intelligent responses with a human-like conversational tone. It is powered by the **OpenAI API** for natural language processing, stores persistent chat history in a **Neon serverless PostgreSQL** database using **Drizzle ORM**, and handles secure user authentication via **ScaleKit** — making it enterprise-ready and scalable.

---

##  Features

-  **AI-Powered Conversations** — Human-like responses via OpenAI API
-  **24/7 Availability** — Always-on assistant with no downtime
-  **Persistent Chat History** — Conversations saved to Neon PostgreSQL via Drizzle ORM
-  **Secure Authentication** — User login & session management via ScaleKit (SSO / OAuth)
-  **Dark / Light Mode** — Theme toggling via `next-themes`
-  **Toast Notifications** — Real-time feedback with Sonner & react-hot-toast
-  **Serverless Ready** — Optimized for Vercel Edge deployment

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **UI Components** | shadcn/ui, Radix UI, Base UI |
| **Styling** | Tailwind CSS v4 |
| **AI** | OpenAI API (`openai` v6) |
| **Authentication** | ScaleKit (`@scalekit-sdk/node`) |
| **ORM** | Drizzle ORM |
| **Database** | Neon (Serverless PostgreSQL) |
| **Notifications** | Sonner, react-hot-toast |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```
Embedded-24-7-Human-Like-Assistant-Chatbot/
│
├── app/                    # Next.js App Router (pages & API routes)
│   ├── api/                # Server-side API route handlers
│   ├── (auth)/             # Authentication pages (login, register)
│   ├── (dashboard)/        # Protected dashboard & chat pages
│   └── layout.tsx          # Root layout with theme provider
│
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui base components
│   ├── chat/               # Chat interface components
│   └── shared/             # Shared layout components (header, sidebar)
│
├── db/                     # Drizzle ORM setup
│   ├── schema.ts           # Database schema definitions
│   └── index.ts            # Neon DB connection instance
│
├── drizzle/                # Auto-generated Drizzle migration files
│
├── hooks/                  # Custom React hooks
│
├── lib/                    # Utility functions & helpers
│
├── public/                 # Static assets
│
├── @types/                 # Custom TypeScript type definitions
│
├── drizzle.config.ts       # Drizzle ORM configuration
├── next.config.ts          # Next.js configuration
├── env.example             # Environment variable template
├── components.json         # shadcn/ui component registry config
├── tsconfig.json           # TypeScript configuration
└── package.json
```

---

## Prerequisites

Ensure the following are set up before proceeding:

- **Node.js** v18+ → [Download](https://nodejs.org/)
- **npm** v9+ (bundled with Node.js)
- **Git** → [Download](https://git-scm.com/)
- A **Neon** database account → [neon.tech](https://neon.tech)
- An **OpenAI** API key → [platform.openai.com](https://platform.openai.com)
- A **ScaleKit** account → [scalekit.com](https://scalekit.com)

Verify your setup:
```bash
node -v
npm -v
git --version
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sabbirkhanoni/Embedded-24-7-Human-Like-Assistant-Chatbot.git
cd Embedded-24-7-Human-Like-Assistant-Chatbot
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

Copy the example environment file:

```bash
cp env.example .env.local
```

Open `.env.local` and fill in all values:

```env
# ─── ScaleKit Authentication ─────────────────────────────
SCALEKIT_ENVIRONMENT_URL=https://your-env.scalekit.com
SCALEKIT_CLIENT_ID=your_scalekit_client_id
SCALEKIT_CLIENT_SECRET=your_scalekit_client_secret
SCALEKIT_REDIRECT_URI=http://localhost:3000/api/auth/callback

# ─── Neon PostgreSQL Database ────────────────────────────
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require

# ─── OpenAI ──────────────────────────────────────────────
OPENAI_API_KEY=sk-your_openai_api_key
```

>  Never commit `.env.local` to version control — it is already in `.gitignore`.

---

### 4️⃣ Set Up the Database

Run Drizzle ORM to initialize your Neon database:

```bash
# Generate migration files from your schema
npm run db:generate

# Apply migrations to the database
npm run db:migrate
```

For quick schema sync during development:
```bash
npm run db:push
```

To browse your database visually:
```bash
npm run db:studio
```

---

### 5️⃣ Run the Development Server

```bash
npm run dev
```

Open your browser at: **http://localhost:3000**

---

### 6️⃣ Build for Production

```bash
npm run build
npm run start
```

ScaleKit provides enterprise-grade authentication including **SSO**, **OAuth 2.0**, and **social login** with minimal configuration.

---

## Environment Variables Reference

| Variable | Description | Where to Get |
|---|---|---|
| `SCALEKIT_ENVIRONMENT_URL` | Your ScaleKit environment base URL | ScaleKit Dashboard |
| `SCALEKIT_CLIENT_ID` | ScaleKit OAuth client ID | ScaleKit Dashboard |
| `SCALEKIT_CLIENT_SECRET` | ScaleKit OAuth client secret | ScaleKit Dashboard |
| `SCALEKIT_REDIRECT_URI` | OAuth callback URL (must match ScaleKit config) | Set in both ScaleKit & your app |
| `DATABASE_URL` | Neon PostgreSQL connection string | Neon Dashboard |
| `OPENAI_API_KEY` | OpenAI secret API key | OpenAI Platform |

---

## Database Commands

| Command | Description |
|---|---|
| `npm run db:generate` | Generate migration files from Drizzle schema |
| `npm run db:migrate` | Run all pending migrations on the database |
| `npm run db:push` | Push schema changes directly (dev only) |
| `npm run db:studio` | Open Drizzle Studio (visual DB browser) |

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint checks |
| `npm run db:generate` | Generate Drizzle migration files |
| `npm run db:migrate` | Apply database migrations |
| `npm run db:push` | Push schema to database directly |
| `npm run db:studio` | Launch Drizzle Studio UI |

---

## Deployment on Vercel

1. Push your repository to GitHub
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repository
4. Add all environment variables under **Project → Settings → Environment Variables**
5. Click **Deploy** — Vercel auto-detects Next.js and handles the rest

```bash
# Optional: deploy via CLI
npm install -g vercel
vercel
```

> Make sure your **Neon database** is set to allow connections from Vercel's IP ranges, or set the IP allowlist to unrestricted for initial testing.

---


##  Future Improvements

-  **Multi-language support** for global users
-  **Multiple named chat sessions** with organization
-  **File & image upload** support within chat
-  **Voice input / output** — speech-to-text & text-to-speech
-  **Embeddable widget** — drop into any website with a `<script>` tag
-  **Advanced analytics** — conversation metrics and user behavior insights

---

## 🤝 Contributing

Contributions are always welcome!

```bash
git fork
git checkout -b feature/your-feature-name
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
# Open a Pull Request on GitHub
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Md Sabbir Khan Oni**
- GitHub: [@sabbirkhanoni](https://github.com/sabbirkhanoni)

---

> ⭐ If you found this project useful, please give it a star on GitHub — it helps a lot and means everything!
