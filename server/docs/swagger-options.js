const options = {
  definition: {
    openapi: '3.0.2',
    info: {
      title: 'Chat API based on Skillcrucial Express Boilerplate',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'skillcrucial chat',
        url: 'https://skillcrucial.com',
        email: 'info@skillcrucial.com'
      }
    },
    servers: [
      {
        url: 'http://0.0.0.0:8090'
      }
    ]
  },
  apis: ['./server/routes/*.js']
}

export default options
