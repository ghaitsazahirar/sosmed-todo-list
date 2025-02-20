const Todos = require('../models/todosModel');

module.exports = {
    // Get All Todos
    index: (req, res) => {
        Todos.getTodos(req.db, (err, rows) => {
            if (err) {
                req.flash('error', err);
                res.render('todos', { data: '' }); // Ubah path ke 'index'
            } else {
                res.render('todos', { // Ubah path ke 'index'
                    title: 'Todos',
                    todos: rows
                });
            }
        });
    },

    // Create New Todo
    create: (req, res) => {
        const todo = {
            post_title: req.body.post_title,
            brand: req.body.brand,
            platform: req.body.platform,
            due_date: req.body.due_date,
            payment: req.body.payment,
            status: req.body.status,
            user_id: req.body.user_id
        };

        Todos.createTodo(req.db, todo, (err) => {
            if (err) {
                req.flash('error', err);
                res.redirect('/todos');
            } else {
                req.flash('success', 'Todo added successfully!');
                res.redirect('/todos');
            }
        });
    },

    // Update Existing Todo
    update: (req, res) => {
        const id = parseInt(req.params.id, 10); // Pastikan ID valid
        if (isNaN(id)) {
            req.flash('error', 'Invalid ID');
            return res.redirect('/todos');
        }
    
        const updatedTodo = {
            post_title: req.body.post_title,
            brand: req.body.brand,
            platform: req.body.platform,
            due_date: req.body.due_date,
            payment: req.body.payment,
            status: req.body.status,
            user_id: req.body.user_id
        };
    
        console.log('Update Todo ID:', id);
        console.log('Data untuk Update:', updatedTodo);
    
        Todos.updateTodo(req.db, id, updatedTodo, (err, result) => {
            if (err) {
                console.error('Error saat update todo:', err);
                req.flash('error', 'Failed to update todo.');
                res.redirect('/todos');
            } else if (result.affectedRows === 0) {
                req.flash('error', 'Todo not found.');
                res.redirect('/todos');
            } else {
                console.log('Update berhasil:', result);
                req.flash('success', 'Todo updated successfully!');
                res.redirect('/todos');
            }
        });
    },
      

    // Delete Todo
    delete: (req, res) => {
        const id = parseInt(req.params.id, 10); // Validasi ID menjadi integer
        if (isNaN(id)) {
            req.flash('error', 'Invalid ID');
            return res.redirect('/todos');
        }
    
        console.log('Delete Todo ID:', id); // Debugging
    
        Todos.deleteTodo(req.db, id, (err, result) => {
            if (err) {
                console.error('Error saat delete todo:', err); // Debugging
                req.flash('error', 'Failed to delete todo.');
                return res.redirect('/todos');
            }
    
            if (result.affectedRows === 0) {
                console.log('Todo not found.'); // Debugging
                req.flash('error', 'Todo not found.');
                return res.redirect('/todos');
            }
    
            console.log('Delete berhasil:', result); // Debugging
            req.flash('success', 'Todo deleted successfully!');
            res.redirect('/todos');
        });
    }       
};
