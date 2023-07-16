const express = require('express');
const router = express.Router();
const books = require('./data');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// hay que hacer lo mismo con los metodos put y delete


/**
 * @swagger
 * components:
 *  schemas:
 *    Book: 
 *      type: object
 *      properties:
 *        title:
 *             type: string
 *             description: the book's title
 *        author:
 *             type: string
 *             description: the book's author
 *      required:
 *        -title
 *        -author
 *      example: 
 *         title: La suerte de los tontos,
 *         author: Albert Lopez,
 *        
 */

/**
 * @swagger 
 *   /books:
 *      post:
 *        summary: create a new book
 *        tags: [Book]
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Book'
 *        responses: 
 *          200:
 *            description: new book created!
 */


router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).json({
    message: 'Body fields required', 
  })
}
const book = req.body;
  book.id = books.length + 1;
  books.push(book);
  res.status(201).json({
    message:'Book added successfully',
    book: books[books.length - 1]
  })
})

/**
 * @swagger 
 *   /books:
 *      get:
 *        summary: return all books
 *        tags: [Book]
 *        responses: 
 *          200:
 *            description: all books
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                $ref: '#/components/schemas/Book'
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Bookstore API',
    books
  })
})

/**
 * @swagger 
 *   /books/{id}:
 *      put:
 *        summary: modificar libro por id
 *        tags: [Book]
 *        parameters:
 *             in: path
 *             name: id
 *             schema: 
 *                type: string
 *                required: true
 *                description: the user id
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Book'
 *        responses: 
 *          200:
 *            description: book updates
 *          404: 
 *            description: book not found
 */
router.put('/:id', (req, res) => {
  if (!req.body || !req.params.id) {
     return res.status(400).json({
    message: 'Book data or id param required',
  })
}
 const bookIndex = books.findIndex(el => {
  return el.id === parseInt(req.params.id);
 })

 if (bookIndex < 0) {
  return res.status(404).json({
    message: `No such a book with ID ${req.params.id}`,
  })
 }

 for (const property in req.body) {
  books[bookIndex][property] = req.body[property]
 }

res.status(200).json({
  message:`The updated book is`,
  book: books[bookIndex],
  }),

/**
 * @swagger 
 *   /books/{id}:
 *      delete:
 *        summary: borrar libro por id
 *        tags: [Book]
 *        parameters:
 *             in: path
 *             name: id
 *             schema: 
 *                type: string
 *                required: true
 *                description: the user id
 *        responses: 
 *          200:
 *            description: book deleted
 *          404: 
 *            description: book not found
 */

router.delete('/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: "ID parameter required",
    })
  }
  const bookIndex = books.findIndex(el => {
    return el.id == parseInt(req.params.id);
  })
  if (bookIndex < 0) {
    return res.status(404).json({
      message: `There's no book with the given ID of "${req.params.id}" `
    })
  }
  const deleteBook = books.splice(bookIndex, 1);
  res.status(200).json({
    message: 'ok',
    deletedBook : deleteBook
  })

})
})

module.exports = router;

