'use strict';

const path = require('path');

module.exports = function () {
  return {
    clientAllowedKeys: ['GOOGLE_MAPS_API_KEY'],
    fastbootAllowedKeys: [],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), '.env'),
  };
};
