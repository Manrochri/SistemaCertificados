import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Sistema Certificado',
    description: 'Documentación generada automáticamente con swagger-autogen'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './src/docs/swagger-output.json';
const endpointsFiles = ['./src/index.js'];  // de aquí cuelgan todas las rutas

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
