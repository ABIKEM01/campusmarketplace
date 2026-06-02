const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Campus Marketplace API',
    description: 'Users and Products API'
  },
  host: 'your-render-app.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';

const endpointsFiles = [
  './routes/users.js',
  './routes/products.js'
];

swaggerAutogen(
  outputFile,
  endpointsFiles,
  doc
);