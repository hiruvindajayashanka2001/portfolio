# Hiruvinda Jayashanka – Portfolio

A personal developer portfolio built from scratch with Next.js, Three.js, and Framer Motion. Features a 3D interactive globe, smooth scroll animations, and a fully responsive layout.

🌐 **Live:** [hiruvinda.dev](https://hiruvinda-dev.netlify.app/) &nbsp;

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| 3D / WebGL | Three.js |
| Animations | Framer Motion |
| Contact Form | Resend |
| Language | JavaScript |

---

## Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js        
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── HeroSection.jsx
│   ├── AboutSection.jsx
│   ├── ProjectsSection.jsx
│   ├── SkillsSection.jsx
│   ├── EducationSection.jsx
│   ├── ContactSection.jsx
│   └── LightPillar.jsx
├── public/
│   ├── assets/                 
│   └── data/
│       └── portfolio.json      
├── tailwind.config.js
└── next.config.mjs
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hiruvindajayashanka2001/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY= your_resend_api_key
CONTACT_EMAIL= your_email_address
```
---

## Customization

All portfolio content lives in `public/data/portfolio.json`. To update your info, projects, skills, or socials — edit that file. No code changes needed.

---

## Sections

| Section | Description |
|---|---|
| Hero | Name, role, tagline, and CTA |
| About | Bio, skills, and stats |
| Projects | Project cards with role, impact, tags, and links |
| Skills | Tech stack overview |
| Education | Academic background |
| Contact | contact form |

---
