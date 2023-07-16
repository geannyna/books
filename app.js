const express = require('express');
const app = express();
const port = 3000;
const path = require("path");

const books = require('./routes/books.js');

//swagger
const swaggerUI = require("swagger-ui-express"); 
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.0.1", 
    info: {
      title:"API REST Books with Swagger and Node JS.",
      version:'1.0.0'
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],

}

app.use(express.json());

app.use('/books', books);
app.use("/api", books);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
  );

app.use('/*', (req, res) => {
  res.status(404).json({
    message: 'Route or params not found',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

