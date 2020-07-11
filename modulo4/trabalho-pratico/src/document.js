export const document = {
  swagger: '2.0',
  info: {
    title: 'My Bank API',
    version: '1.0.0',
    description: 'Control of bank accounts',
  },
  host: 'localhost:3333',
  schemes: ['http'],
  tags: [
    {
      name: 'accounts',
      description: 'Bank customer accounts',
    },
  ],
  paths: {
    '/accounts/{agency}/{number}': {
      get: {
        tags: ['accounts'],
        summary: 'Get an account',
        description: 'Get an account with the parameters provided',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'agency',
            description: 'Customer account agency',
            required: true,
            parameters: [
              {
                name: 'agency',
                in: 'path',
                description: 'Customer agency',
                required: true,
                type: 'integer',
                format: 'int64',
              },
            ],
          },
          {
            in: 'path',
            name: 'number',
            description: 'Customer account number',
            required: true,
            parameters: [
              {
                name: 'number',
                in: 'path',
                description: 'Account number',
                required: true,
                type: 'integer',
                format: 'int64',
              },
            ],
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation',
            schema: {
              type: 'object',
              properties: {
                balance: {
                  type: 'number',
                  format: 'double',
                },
              },
            },
          },
          '404': {
            description: 'Not found',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  exemple: 'Agency and account not found in collection',
                },
              },
            },
          },
          '500': {
            description: 'Error ocurred',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['accounts'],
        summary: 'Remove an account',
        description: 'Removes an existing account',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'agency',
            description: 'Customer account agency',
            required: true,
            parameters: [
              {
                name: 'agency',
                in: 'path',
                description: 'Customer agency',
                required: true,
                type: 'integer',
                format: 'int64',
              },
            ],
          },
          {
            in: 'path',
            name: 'number',
            description: 'Customer account number',
            required: true,
            parameters: [
              {
                name: 'number',
                in: 'path',
                description: 'Account number',
                required: true,
                type: 'integer',
                format: 'int64',
              },
            ],
          },
        ],
        responses: {
          '200': {
            description: 'Return the number of active accounts',
          },
          '500': {
            description: 'Error ocurred',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/accounts/highestBalance/{quantity}': {
      get: {
        tags: ['accounts'],
        summary: 'Get accounts ',
        description: 'Get accounts with higher balance',
        produces: ['application/json'],
        parameters: [
          {
            name: 'quantity',
            in: 'path',
            description: 'Provide as many accounts',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation',
            schema: {
              type: 'object',
              properties: {
                agency: {
                  type: 'integer',
                  format: 'int64',
                },
                number: {
                  type: 'integer',
                  format: 'int64',
                },
                name: {
                  type: 'string',
                },
                balance: {
                  type: 'number',
                  format: 'double',
                  minimum: 0,
                },
              },
            },
          },
          '500': {
            description: 'Error ocurred',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/accounts/lowestBalance/{quantity}': {
      get: {
        tags: ['accounts'],
        summary: 'Get accounts ',
        description: 'Get accounts with lower balance',
        produces: ['application/json'],
        parameters: [
          {
            name: 'quantity',
            in: 'path',
            description: 'Provide as many accounts',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation',
            schema: {
              type: 'object',
              properties: {
                agency: {
                  type: 'integer',
                  format: 'int64',
                },
                number: {
                  type: 'integer',
                  format: 'int64',
                },
                balance: {
                  type: 'number',
                  format: 'double',
                  minimum: 0,
                },
              },
            },
          },
          '500': {
            description: 'Error ocurred',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/accounts/average/{agency}': {
      get: {
        tags: ['accounts'],
        summary: 'Get the agency average',
        description: 'Get the average agency balance',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'agency',
            description: 'Provide the agency',
            required: true,
            parameters: [
              {
                name: 'agency',
                in: 'path',
                required: true,
                type: 'integer',
                format: 'int64',
              },
            ],
          },
        ],
        responses: {
          '200': {
            description: 'Returns the agency average',
          },
          '500': {
            description: 'Error occurred',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/accounts/deposit': {
      post: {
        tags: ['accounts'],
        summary: 'Deposit a value',
        description: 'Deposits an amount into the account',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Provide account is value',
            required: true,

            schema: {
              in: 'body',
              name: 'body',
              type: 'object',
              required: ['agency', 'account', 'value'],
              properties: {
                agency: {
                  type: 'integer',
                  format: 'int64',
                },
                number: {
                  type: 'integer',
                  format: 'int64',
                },
                value: {
                  type: 'number',
                  format: 'double',
                },
              },
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the balance',
          },
          '404': {
            description: 'Not found',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  exemple: 'Agency and account not found in collection',
                },
              },
            },
          },
          '500': {
            description: 'Error occurred',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/accounts/withdraw': {
      post: {
        tags: ['accounts'],
        summary: 'Withdraw a value',
        description: 'withdraw an amount from the account',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Provide account is value',
            required: true,

            schema: {
              in: 'body',
              name: 'body',
              type: 'object',
              required: ['agency', 'account', 'value'],
              properties: {
                agency: {
                  type: 'integer',
                  format: 'int64',
                },
                number: {
                  type: 'integer',
                  format: 'int64',
                },
                value: {
                  type: 'number',
                  format: 'double',
                },
              },
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the balance',
          },
          '404': {
            description: 'Not found',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  exemple: 'Agency and account not found in collection',
                },
              },
            },
          },
          '500': {
            description: 'Error occurred',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/accounts/transfer': {
      post: {
        tags: ['accounts'],
        summary: 'Balance transfer between accounts',
        description: 'balance transfer between accounts',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description:
              'Provide the value and the source and destination accounts as a parameter.',
            required: true,

            schema: {
              in: 'body',
              name: 'body',
              type: 'object',
              required: [
                'originAgency',
                'originNumber',
                'destinyAgency',
                'destinyNumber',
                'value',
              ],
              properties: {
                originAgency: {
                  type: 'integer',
                  format: 'int64',
                },
                originNumber: {
                  type: 'integer',
                  format: 'int64',
                },
                destinyAgency: {
                  type: 'integer',
                  format: 'int64',
                },
                destinyNumber: {
                  type: 'integer',
                  format: 'int64',
                },
                value: {
                  type: 'number',
                  format: 'double',
                },
              },
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the balance the origin account',
          },
          '404': {
            description: 'Not found',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                },
              },
            },
          },
          '500': {
            description: 'Error occurred',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/accounts/privateAccounts': {
      post: {
        tags: ['accounts'],
        summary: 'Private customers',
        description:
          'The clients with the highest balance at each branch are transferred to a special branch',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'Successful operation',
            schema: {
              type: 'object',
              properties: {
                agency: {
                  type: 'integer',
                  format: 'int64',
                },
                number: {
                  type: 'integer',
                  format: 'int64',
                },
                name: {
                  type: 'string',
                },
                balance: {
                  type: 'number',
                  format: 'double',
                  minimum: 0,
                },
              },
            },
          },
          '500': {
            description: 'Error occurred',
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    account: {
      type: 'object',
      required: ['agency', 'number', 'name', 'balance'],
      properties: {
        _id: {
          type: 'string',
        },
        agency: {
          type: 'integer',
          format: 'int64',
        },
        number: {
          type: 'integer',
          format: 'int64',
        },
        name: {
          type: 'string',
        },
        balance: {
          type: 'number',
          format: 'double',
          minimum: 0,
        },
      },
    },
  },
};
