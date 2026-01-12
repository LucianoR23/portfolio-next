# Personal Portfolio - Luciano Rodriguez

🌐 **Live Demo:** [Insert your Vercel link here]

A modern, high-performance personal portfolio built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Designed to showcase projects with a focus on both public demos and private SaaS products using a smart UI.

## ✨ Features

- **Dual Layout System**: Switch seamlessly between a trendy **Bento Grid** and a clean **Minimal List** view.
- **Smart Project Cards**: Intelligent UI that adapts based on project status (Public, Private/SaaS, or GitHub Repo).
- **Dark/Light Mode**: Fully integrated theme toggle with smooth animations using `next-themes`.
- **Interactive UI**: Powered by **Framer Motion** for smooth scroll reveals and transitions.
- **Video Avatar**: Optimized background video support for a dynamic personal introduction.
- **Responsive**: Mobile-first design that looks perfect on any device.
- **SEO Optimized**: Built with Next.js App Router for best-in-class performance and SEO.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme Management**: next-themes
- **Utilities**: clsx, tailwind-merge

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher recommended for Next.js 16)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone [https://github.com/LucianoR23/portfolio-luciano.git](https://github.com/LucianoR23/portfolio-luciano.git)
cd portfolio-luciano

```

2. Install dependencies:

```bash
npm install
# or
yarn install

```

3. Start the development server:

```bash
npm run dev
# or
yarn dev

```

4. Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

## 📝 Scripts

* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm start` - Start production server
* `npm run lint` - Run ESLint checks

## 🎨 Customization

### 1. Update Content (The "Brain")

All your personal data, projects, and skills are centralized in one file. You don't need to dig into components to change text.

* **File**: `src/data/portfolio.ts`

### 2. Media Files

Place your images and videos in the `public/` folder:

* `avatar-video.mp4` (Your intro video)
* `cv_luciano_rodriguez.pdf` (Your Resume)
* Project screenshots (e.g., `/sistema-gestion.png`)

### 3. Styling & Colors

The design uses Tailwind CSS variables. You can customize the color palette in:

* **File**: `src/app/globals.css` (Look for `:root` and `.dark` classes)

## 📁 Project Structure

```
/
├── public/              # Static assets (images, pdfs, videos)
├── src/
│   ├── app/            # Next.js 16 App Router pages & layout
│   │   ├── globals.css # Global styles & Tailwind config
│   │   └── page.tsx    # Main entry point
│   ├── components/
│   │   ├── layout/     # Structural components (Navbar, Footer)
│   │   ├── sections/   # Page sections (Hero, Projects, Experience)
│   │   └── ui/         # Reusable atoms (ProjectCard, ThemeToggle, etc.)
│   ├── data/           # Centralized data file (portfolio.ts)
│   └── lib/            # Utilities (smoothScroll, cn)
├── .gitattributes      # Git configuration (LF/CRLF handling)
└── tailwind.config.ts  # Tailwind configuration

```

## 🌐 Deployment

The easiest way to deploy this app is using **Vercel** (the creators of Next.js).

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and "Add New Project".
3. Select your repository.
4. **Important**: Add the Environment Variable for the layout style (Optional, defaults to minimal).
* `NEXT_PUBLIC_PORTFOLIO_STYLE` = `bento` (or `minimal`)


5. Click **Deploy**.

## 📄 License

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

## 📞 Contact

* **Name**: Luciano Rodriguez
* **Role**: Front End Developer & QA Analyst
* **LinkedIn**: [Luciano Rodriguez](https://www.google.com/search?q=https://www.linkedin.com/in/tu-perfil)
* **Email**: [luciano.rodriguez.dev@gmail.com]

---

Built in Corrientes, Argentina using Next.js 16 & Tailwind CSS 4.