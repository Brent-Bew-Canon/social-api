const router = require('express').Router();
const {
    getStudents,
    getSingleStudent,
    createStudent,
    deleteStudent,
    addAssignment,
    removeAssignment,
} = require('../../controllers/studentController');

// /api/users
router.route('/').get(getStudents).post(createStudent);

// /api/users/:studentId
router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// /api/users/:studentId/assignments
router.route('/:studentId/assignments').post(addAssignment);

// /api/users/:studentId/assignments/:assignmentId
router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
