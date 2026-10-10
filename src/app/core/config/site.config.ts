/**
 * Central place for personal data and external links.
 * Personal data and external links used across the site.
 */
export const SITE_CONFIG = {
  ownerName: 'Chris Noack',
  // Public contact e-mail address (hero, footer, legal pages)
  email: 'chris86noack@gmail.com',
  githubUrl: 'https://github.com/ChrisNo86',
  // LinkedIn profile URL. Empty = all LinkedIn links are hidden.
  linkedinUrl: '',
  // Endpoint of the PHP mailer that is uploaded together with the build.
  mailEndpoint: 'sendMail.php',
  // Postal address for the legal notice (required by § 5 DDG)
  address: {
    street: 'Eggestr. 4a',
    city: '32758 Detmold',
    country: 'Deutschland / Germany',
  },
} as const;
