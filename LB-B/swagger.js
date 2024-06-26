const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: "1.0.0",
        title: "Tasks API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        id: 1,
        task: {
            id: 1,
            title: "Title of Task",
            description: "Some Description",
            done: "06-06-2024",
            due_date: "07-06-2024"
        },
        listOfTasks: [
            {$ref: '#/definitions/task'}
        ],
        taskWithoutId: {
            title: "Title of Task",
            description: "Some Description",
            done: "06-06-2024",
            due_date: "07-06-2024"
        },
        credentials: {
            email: "someone@gmail.com",
            password: "superSecretPassword"
        },
        message: "response message"
    }
}

const outputFile = './swagger-output.json';
const routes = ['./controller.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
    require("./controller.js")
});