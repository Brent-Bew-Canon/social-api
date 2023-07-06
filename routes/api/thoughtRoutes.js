const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// /api/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction).delete()

// /api/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)


module.exports = router;