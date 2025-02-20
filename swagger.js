const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Media Todo List API',
      version: '1.0.0',
      description: 'API documentation for managing users and todos in a social media post manager.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
        Todo: {
          type: 'object',
          required: ['post_title', 'brand', 'platform', 'due_date', 'payment', 'status', 'user_id'],
          properties: {
            id: { type: 'integer' },
            post_title: { type: 'string' },
            brand: { type: 'string' },
            platform: { type: 'string' },
            due_date: { type: 'string', format: 'date' },
            payment: { type: 'number' },
            status: { type: 'string' },
            user_id: { type: 'integer' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Specify where your route files are
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
