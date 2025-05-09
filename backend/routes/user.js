const express = require('express');

const {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    addFavortieResort,
    removeFavoriteResort,
    deleteUser,
    totalFavorites
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/:userId', updateUser);
router.post('/favorites/:userId', addFavortieResort);
router.delete('/favorites/:userId', removeFavoriteResort);
router.delete('/:userId', deleteUser);
router.get('/total-favorites/:resortId', totalFavorites);

module.exports = router;