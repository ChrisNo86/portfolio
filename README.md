# Portfolio – Chris Noack

Angular 20 (standalone components, signals) · SCSS · ngx-translate (EN/DE)

## Start

```bash
npm install
npm start          # http://localhost:4200
npm run build      # output: dist/portfolio/browser
```

## Upload (FTP)

Upload the **contents** of `dist/portfolio/browser` to the web root of your domain.
It contains `sendMail.php` (contact form) and `.htaccess` (HTTPS redirect + Angular routing).

## Before submission – fill in the TODOs

| File | What |
| --- | --- |
| `src/app/core/config/site.config.ts` | e-mail, LinkedIn URL, postal address |
| `src/app/core/data/portfolio.data.ts` | live URLs (subdomains) of the projects |
| `public/sendMail.php` | recipient, domain, sender address |
| `public/assets/i18n/en.json` / `de.json` | testimonials, hosting provider (privacy policy) |
| `public/assets/img/` | project preview images (Memory is a placeholder) |

## Structure

```
src/app
├── core            config, models, data, services, i18n helper
├── shared          header, footer, logo, language toggle
└── features
    ├── home        hero, about, skills, projects (+ dialog), testimonials, contact
    └── legal       legal notice, privacy policy
```
