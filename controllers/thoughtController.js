const { ObjectId } = require('mongoose').Types;
const { Thought, User, reactionSchema } = require('../models');

// Gets the number of thoughts overall
const thoughtCount = async () => {
    const numOfThoughts = await Thought.count();
    return numOfThoughts;
}

module.exports = {
    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            let thoughts = await Thought.find();

            let thoughtObj = {
                thoughts,
                thoughtCount: await thoughtCount(),
            };

            res.json(thoughtObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },


    // Get a single thought
    async getSingleThought(req, res) {
        try {
            let thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No Thought with that ID' })
            }

            res.json({
                thought
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            let thought = await Thought.create(req.body);

            let user = await User.findOneAndUpdate(
                { username: thought.username },
                { $addToSet: { thoughts: thought } },
                { new: true }
            )

            res.json([thought, user]);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //delete a thought
    async deleteThought(req, res) {
        try {
            let thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'Thought does not exist' });
            }

            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update a thought
    async updateThought(req, res) {
        try {
            let thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { thoughtText: req.body.thoughtText }, { new: true })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No Thought with that ID' })
            }
            res.json({
                thought
            });
        } catch (error) {

        }
    },

    // create a reaction stored in a single thought's reactions array field
    async createReaction(req, res) {
        try {
            let thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            )

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },

    // pull and remove a reaction by the reaction's reactionId value
    async deleteReaction(req, res) {
        try {
            let thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }
            res.json({
                thought
            });
        } catch (error) {

        }
    },
};