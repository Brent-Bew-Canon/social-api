const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    // deleteStudent,
    // addAssignment,
    // removeAssignment,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:studentId
router.route('/:userId').get(getSingleUser)
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// /api/users/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// /api/users/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
