# 📝 Next.js Scalable Blog & SaaS Platform
![alt text](<public/project-image/image copy.png>)
A modern, **scalable blog and project showcase** built with **Next.js App Router**, **Prisma + PostgreSQL**, and **Stripe** — designed to evolve from a personal blog into a full SaaS-style platform with subscriptions, admin tools, and premium content.

---

## ✨ Features

### 📰 Content

* **Blog** with MDX + Contentlayer integration
* **Projects showcase** with premium gating
* **Full-text search** powered by **MiniSearch / Algolia**

### 👥 Community & Engagement

* **Comments system** with threaded discussions
* **Newsletter subscription** (Prisma-backed, ready for Resend/Mailchimp integration)
* **Reactions & feedback** (extendable with Supabase/Giscus)

### 🔐 Admin Dashboard

* Manage **Posts, Projects, Comments, Newsletter subscribers**
* **Billing Management**: View Stripe customers & subscriptions
* **Actions**: Cancel or refresh subscriptions directly from the dashboard

### 💳 Monetization & Premium

* **Stripe Checkout** integration for subscriptions
* **Webhook syncing** to Prisma (subscription lifecycle auto-updates)
* **Premium content gating** for posts & projects (only visible to subscribers)

### 🛠 Developer Experience

* **Feature-based folder structure** (`features/`, `shared/`, `core/`)
* **Scalable API layer** with Next.js route handlers
* **Prisma ORM** for type-safe DB queries
* **Beautiful UI** using TailwindCSS + shared UI components (`Heading`, `Card`, `Button`)

![alt text](public/project-image/image.png)

---

## 🚀 Tech Stack

* **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
* **Database**: [PostgreSQL + Prisma ORM](https://www.prisma.io/)
* **Auth (future)**: Clerk / NextAuth.js (planned)
* **Payments**: [Stripe](https://stripe.com/) (Checkout + Webhooks)
* **Content**: MDX + Contentlayer
* **Search**: MiniSearch (local) / Algolia (scalable)
* **UI**: TailwindCSS + custom components
* **Newsletter**: Prisma-backed subscribers (ready to connect with Resend/Mailchimp)

---

## ⚡ Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/sahil-kumar-yadav/blogsy
   cd yourrepo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables** (`.env.local`)

   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PRICE_ID=price_12345
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Start dev server**

   ```bash
   npm run dev
   ```

6. **Start Stripe webhook listener (dev only)**

   ```bash
   stripe listen --forward-to localhost:3000/api/billing/webhook
   ```

---

## 🌟 Roadmap

* [ ] 🔐 Authentication (Clerk / NextAuth)
* [ ] 📝 Rich text/MDX editor for posts in Admin
* [ ] 📊 Analytics dashboard for traffic & engagement
* [ ] 🛒 Stripe metered billing / one-time purchases
* [ ] 📂 Media uploads (images, files) via S3/Supabase Storage
* [ ] 🤝 Team collaboration (multi-user admin roles)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/sahil-kumar-yadav/issues).

---

## 📜 License

MIT License © 2025 \[sahil-kumar-yadav]

---

🔥 Built with passion, designed to scale into **a full-fledged SaaS platform**.

