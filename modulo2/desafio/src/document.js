export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'Grades Control API description',
    version: '1.0.0',
    title: 'Grades Control API description',
  },
  host: 'localhost:3333',
  schemes: ['http'],
  tags: [
    {
      name: 'grades',
      description: 'Grades students',
    },
  ],
  paths: {
    '/grades/{id}': {
      get: {
        tags: ['grades'],
        summary: 'Get existing grade',
        description: 'Get existing account description',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of grade to return',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Grade',
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
      put: {
        tags: ['grades'],
        summary: 'Updates a grade in the store with form data',
        description: '',
        produces: ['application/json'],
        parameters: [
          {
            id: 'id',
            in: 'path',
            description: 'ID of grade that needs to be updated',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Grade',
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
      delete: {
        tags: ['grades'],
        summary: 'Deletes a grade',
        description: '',
        produces: ['application/json'],
        parameters: [
          {
            name: 'api_key',
            in: 'header',
            required: false,
            type: 'string',
          },
          {
            name: 'petId',
            in: 'path',
            description: 'Grade id to delete',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          '400': {
            description: 'Invalid ID supplied',
          },
          '404': {
            description: 'Pet not found',
          },
        },
      },
    },
    '/grades/saveGrade': {
      post: {
        tags: ['grades'],
        summary: 'Create a new student grade',
        description: 'Create a new student grade with the received parameters',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Student grade object',
            required: true,
            schema: {
              $ref: '#/definitions/saveGrade',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Grade created',
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },
  },
  definitions: {
    saveGrade: {
      type: 'object',
      properties: {
        student: {
          type: 'string',
          example: 'Mauricio Viana',
        },
        subject: {
          type: 'string',
          example: '01 - JavaScript',
        },
        type: {
          type: 'string',
          example: 'Desafio',
        },
        value: {
          type: 'integer',
          example: 20.25,
        },
      },
    },
    Grade: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        student: {
          type: 'string',
        },
        subject: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        value: {
          type: 'integer',
        },
        timestamp: {
          type: 'date',
        },
      },
    },
  },
};
