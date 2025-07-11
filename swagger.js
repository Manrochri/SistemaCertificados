import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

const doc = {
  info: {
    title: 'API Sistema de Certificación',
    description: 'API para el sistema de certificación'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
}

swaggerAutogen(outputFile, endpointsFiles, doc);