module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'default-src': ["'self'", 'https://fonts.gstatic.com', 'https://fonts.googleapis.com', process.env.STRAPI_ADMIN_RASA_URL],
          'font-src': ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com", "data:"],
          'img-src': ["'self'", 'data:', 'https://i.imgur.com'],
          'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://fonts.gstatic.com", process.env.STRAPI_ADMIN_RASA_URL],
          'script-src': ["'self'", 'http:', 'https:'],
          'connect-src': ["'self'", process.env.STRAPI_ADMIN_RASA_URL, `ws://${process.env.STRAPI_ADMIN_RASA_URL.replace('http://', '')}`],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
