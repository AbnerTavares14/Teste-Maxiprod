import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend',
      version: '1.0.0',
      description: 'Documentação da API com Swagger',
    },
    servers: [
      {
        url: `http://localhost:5000`,
      },
    ],
    components: {
      schemas: {
        Person: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'John Doe'
            },
            age: {
              type: 'integer',
              example: 30
            }
          },
          required: ['name', 'age']
        },
        Transaction: {
          type: 'object',
          properties: {
            person_id: {
              type: 'number',
              example: 1
            },
            description: {
              type: 'string',
              example: 'Salário'
            },
            amount: {
              type: 'number',
              example: 150.75
            },
            type: {
              type: 'string',
              enum: ['receita', 'despesa'],
              example: 'receita'
            }
          },
          required: ['amount', 'type', 'date']
        },
      }
    }
  },
  apis: [path.resolve(__dirname, './routes/*.ts')],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
