const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    updateFriends
    // addAssignment,
    // removeAssignment,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').put(updateFriends)

// /api/users/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// /api/users/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
