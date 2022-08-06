'use strict';

module.exports = function (environment) {
  let ENV = {
    // MY_OTHER_KEY: process.env.GOOGLE_MAPS_API_KEY,
    modulePrefix: 'birdwatcher',
    environment,
    rootURL: '/',
    locationType: 'history',
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    AUTH0_CLIENTID: process.env.AUTH0_CLIENTID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  ENV['ember-cli-mirage'] = {
    enabled: false,
  };

  ENV['ember-google-maps'] = {
    key: process.env.GOOGLE_MAPS_API_KEY, // Using .env files in this example
    language: 'en',
    region: 'PL',
    protocol: 'https',
    version: '3.41',
    libraries: ['geometry', 'places'], // Optional libraries
    // client: undefined,
    // channel: undefined,
    // baseUrl: '//maps.googleapis.com/maps/api/js',
    // mapIds: ['1234', '2345'],
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    ENV['ember-cli-mirage'] = {
      enabled: true,
    };

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
