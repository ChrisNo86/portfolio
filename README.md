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

## Where to change content

| File | What |
| --- | --- |
| `src/app/core/config/site.config.ts` | name, e-mail, GitHub/LinkedIn, address |
| `src/app/core/data/portfolio.data.ts` | projects (links, images, technologies), skills |
| `public/assets/i18n/en.json` / `de.json` | all texts incl. testimonials and legal pages |
| `public/sendMail.php` | recipient and allowed origin of the contact form |

## Structure

```
src/app
├── core            config, models, data, services, i18n helper
├── shared          header, footer, logo, language toggle
└── features
    ├── home        hero, about, skills, projects (+ dialog), testimonials, contact
    └── legal       legal notice, privacy policy
```
