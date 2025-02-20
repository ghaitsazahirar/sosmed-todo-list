const bcrypt = require('bcrypt');
const Users = require('../models/usersModel');

module.exports = {
    // Get All Users
    index: (req, res) => {
        Users.getUsers(req.db, (err, rows) => {
            if (err) {
                req.flash('error', err);
                res.render('index', { users: [] }); // Ubah path jadi 'index'
            } else {
                res.render('index', { // Ubah path jadi 'index'
                    title: 'Users',
                    users: rows
                });
            }
        });
    },    

    // Create New User with Password Hashing
    create: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            };

            Users.createUser(req.db, user, (err) => {
                if (err) {
                    req.flash('error', err);
                    res.redirect('/users');
                } else {
                    req.flash('success', 'User added successfully!');
                    res.redirect('/users');
                }
            });
        } catch (err) {
            req.flash('error', 'Failed to hash password.');
            res.redirect('/users');
        }
    },

    // Update Existing User with Password Hashing (if provided)
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10); // Pastikan ID adalah angka
            if (isNaN(id)) {
                req.flash('error', 'Invalid ID');
                return res.redirect('/users');
            }
    
            console.log('ID:', id);
            console.log('Request Body:', req.body);
    
            const queryBefore = `SELECT * FROM users WHERE id = ?`;
            req.db.query(queryBefore, [id], async (err, resultBefore) => {
                if (err) {
                    console.error('Error fetching user before update:', err);
                    req.flash('error', 'Failed to fetch user.');
                    return res.redirect('/users');
                }
    
                console.log('Data Sebelum Update:', resultBefore);
                if (resultBefore.length === 0) {
                    req.flash('error', 'User not found.');
                    return res.redirect('/users');
                }
    
                // Hash password jika ada
                let hashedPassword = resultBefore[0].password; // Default gunakan password lama
                if (req.body.password) {
                    hashedPassword = await bcrypt.hash(req.body.password, 10);
                }
    
                const updatedUser = {
                    name: req.body.name || resultBefore[0].name,
                    email: req.body.email || resultBefore[0].email,
                    password: hashedPassword,
                };
    
                const queryUpdate = `
                    UPDATE users 
                    SET name = ?, email = ?, password = ?
                    WHERE id = ?
                `;
                const values = [
                    updatedUser.name,
                    updatedUser.email,
                    updatedUser.password,
                    id,
                ];
    
                console.log('Query Update:', queryUpdate);
                console.log('Values Update:', values);
    
                req.db.query(queryUpdate, values, (errUpdate, resultUpdate) => {
                    if (errUpdate) {
                        console.error('Error updating user:', errUpdate);
                        req.flash('error', 'Failed to update user.');
                        return res.redirect('/users');
                    }
    
                    console.log('Hasil Update:', resultUpdate);
    
                    req.flash('success', 'User updated successfully!');
                    res.redirect('/users');
                });
            });
        } catch (err) {
            console.error('Error in update:', err);
            req.flash('error', 'Failed to hash password.');
            res.redirect('/users');
        }
    },    
    
    // Delete User
    delete: (req, res) => {
        const id = req.params.id;
    
        req.db.query('DELETE FROM todos WHERE user_id = ?', [id], (err) => {
            if (err) {
                console.error('Error deleting related todos:', err);
                req.flash('error', 'Failed to delete related todos');
                res.redirect('/users');
            } else {
                req.db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
                    if (err) {
                        console.error('Error deleting user:', err);
                        req.flash('error', 'Failed to delete user');
                        res.redirect('/users');
                    } else {
                        console.log('User and related todos deleted successfully!');
                        req.flash('success', 'User deleted successfully!');
                        res.redirect('/users');
                    }
                });
            }
        });
    }        
};
