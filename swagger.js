const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Campus Marketplace API',
    description: 'Users and Products API'
  },
  host: 'campusmarketplace-q8dc.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';

const endpointsFiles = [
  './app.js'
];

swaggerAutogen(
  outputFile,
  endpointsFiles,
  doc
);