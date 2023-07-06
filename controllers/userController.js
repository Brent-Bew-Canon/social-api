const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');
// const { Course } = require('../models');

// Gets the number of users overall
const userCount = async () => {
    const numOfUsers = await User.count();
    return numOfUsers;
}



module.exports = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            let users = await User.find();

            let userObj = {
                users,
                userCount: await userCount(),
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },


    // Get a single user
    async getSingleUser(req, res) {
        try {
            let user = await User.findOne({ _id: req.params.userId })
                // .select('-__v friends thoughts');
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No User with that ID' })
            }

            res.json({
                user
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            let user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update a user
    async updateUser(req, res) {
        try {
            let user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No User with that ID' })
            }
            user.username = req.body.username;
            user.email = req.body.email;
            user.save();
            res.json({
                user
            });
        } catch (error) {

        }
    },

    //delete a user
    async deleteUser(req, res) {
        try {
            let user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'User does not exist' });
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add a new friend to a user's friend list
    async updateFriends(req, res) {
        try {
            let user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No User with that ID' })
            }
            user.friends.push(req.params.friendId)
            user.save();
            res.json({
                user
            });
        } catch (error) {

        }
    },

    // remove a friend from a user's friend list
};

// Aggregate function for getting the overall grade using $avg
// const grade = async (studentId) =>
//     Student.aggregate([
//         // only include the given student by using $match
//         { $match: { _id: new ObjectId(studentId) } },
//         {
//             $unwind: '$assignments',
//         },
//         {
//             $group: {
//                 _id: new ObjectId(studentId),
//                 overallGrade: { $avg: '$assignments.score' },
//             },
//         },
//     ]);



// // Delete a student and remove them from the course
// async deleteStudent(req, res) {
//     try {
//         const student = await Student.findOneAndRemove({ _id: req.params.studentId });

//         if (!student) {
//             return res.status(404).json({ message: 'No such student exists' });
//         }

//         const course = await Course.findOneAndUpdate(
//             { students: req.params.studentId },
//             { $pull: { students: req.params.studentId } },
//             { new: true }
//         );

//         if (!course) {
//             return res.status(404).json({
//                 message: 'Student deleted, but no courses found',
//             });
//         }

//         res.json({ message: 'Student successfully deleted' });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// },

// // Add an assignment to a student
// async addAssignment(req, res) {
//     console.log('You are adding an assignment');
//     console.log(req.body);

//     try {
//         const student = await Student.findOneAndUpdate(
//             { _id: req.params.studentId },
//             { $addToSet: { assignments: req.body } },
//             { runValidators: true, new: true }
//         );

//         if (!student) {
//             return res
//                 .status(404)
//                 .json({ message: 'No student found with that ID :(' });
//         }

//         res.json(student);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// },
// // Remove assignment from a student
// async removeAssignment(req, res) {
//     try {
//         const student = await Student.findOneAndUpdate(
//             { _id: req.params.studentId },
//             { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
//             { runValidators: true, new: true }
//         );

//         if (!student) {
//             return res
//                 .status(404)
//                 .json({ message: 'No student found with that ID :(' });
//         }

//         res.json(student);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// },