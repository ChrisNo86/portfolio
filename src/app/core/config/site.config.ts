/**
 * Central place for personal data and external links.
 * Everything marked with TODO must be filled in before submission.
 */
export const SITE_CONFIG = {
  ownerName: 'Chris Noack',
  // TODO: public contact e-mail address (shown in hero, footer and legal pages)
  email: 'TODO@your-domain.de',
  githubUrl: 'https://github.com/ChrisNo86',
  // TODO: add your LinkedIn profile URL (required by the course checklist). Empty = hidden.
  linkedinUrl: '',
  // Endpoint of the PHP mailer that is uploaded together with the build.
  mailEndpoint: 'sendMail.php',
  // TODO: postal address for the legal notice (required by § 5 DDG)
  address: {
    street: 'TODO Straße 1',
    city: 'TODO 00000 Stadt',
    country: 'Deutschland / Germany',
  },
} as const;
