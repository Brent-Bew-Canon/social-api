const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

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
    async deleteFriends(req, res) {
        try {
            let user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No User with that ID' })
            }
            res.json({
                user
            });
        } catch (error) {

        }
    },
};