module.exports = {
    // Get All Users
    getUsers: (db, callback) => {
        const query = `SELECT * FROM users`;
        db.query(query, callback);
    },

    // Create New User
    createUser: (db, user, callback) => {
        const query = `
            INSERT INTO users (name, email, password) 
            VALUES (?, ?, ?)
        `;
        const values = [user.name, user.email, user.password];
        db.query(query, values, callback);
    },

    // Update Existing User
    updateUser: (db, id, updatedUser, callback) => {
        const query = `
            UPDATE users 
            SET name = ?, email = ?, password = ?
            WHERE id = ?
        `;
        const values = [
            updatedUser.name,
            updatedUser.email,
            updatedUser.password,
            id
        ];
        db.query(query, values, callback);
    },

    // Delete User
    deleteUser: (db, id, callback) => {
        db.query('DELETE FROM users WHERE id = ?', [id], callback);
    },    
};
