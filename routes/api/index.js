const router = require('express').Router();
const userRoutes = require('./courseRoutes');
const thoughtRoutes = require('./studentRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
