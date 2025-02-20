module.exports = {
    // Get All Todos
    getTodos: (db, callback) => {
        const query = `
            SELECT t.*, u.name AS user_name 
            FROM todos t 
            JOIN users u ON t.user_id = u.id
        `;
        db.query(query, callback);
    },

    // Create New Todo
    createTodo: (db, todo, callback) => {
        const query = `
            INSERT INTO todos 
            (post_title, brand, platform, due_date, payment, status, user_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            todo.post_title,
            todo.brand,
            todo.platform,
            todo.due_date,
            todo.payment,
            todo.status,
            todo.user_id
        ];
        db.query(query, values, callback);
    },

    // Update Existing Todo
    updateTodo: (db, id, updatedTodo, callback) => {
        const query = `
            UPDATE todos 
            SET post_title = ?, brand = ?, platform = ?, due_date = ?, payment = ?, status = ?, user_id = ?
            WHERE id = ?
        `;
        const values = [
            updatedTodo.post_title,
            updatedTodo.brand,
            updatedTodo.platform,
            updatedTodo.due_date,
            updatedTodo.payment,
            updatedTodo.status,
            updatedTodo.user_id,
            id
        ];
    
        db.query(query, values, callback);
    },       

    // Delete Todo
    deleteTodo: (db, id, callback) => {
        const query = 'DELETE FROM todos WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result);
        });
    }        
};
