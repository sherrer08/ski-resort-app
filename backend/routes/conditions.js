const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const {
    createCondition,
    getConditionsByResort,
    updateCondition,
    deleteCondition,
    averageRating
} = require('../controllers/conditionsController');

const router = express.Router();

router.post('/', requireAuth, createCondition);

router.get('/:resortId', getConditionsByResort);

router.patch('/:conditionId', updateCondition);

router.delete('/:conditionId', deleteCondition);

router.get('/average-rating/:resortId', averageRating);

module.exports = router;