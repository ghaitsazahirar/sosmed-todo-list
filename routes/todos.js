const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');

// Todos Routes
router.get('/', todosController.index); // Get All Todos
router.post('/create', todosController.create); // Create Todo
router.put('/update/:id', todosController.update); // Update Todo
router.delete('/delete/:id', todosController.delete); // Delete Todo

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API for managing todos
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */

/**
 * @swagger
 * /todos/create:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Todo created successfully
 */

/**
 * @swagger
 * /todos/update/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 */

/**
 * @swagger
 * /todos/delete/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the todo
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 */
