const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    updateFriends,
    deleteFriends
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').put(updateFriends).delete(deleteFriends)

module.exports = router;
