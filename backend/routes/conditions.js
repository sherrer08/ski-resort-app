const express = require('express');

const {
    createCondition,
    getConditionsByResort,
    updateCondition,
    deleteCondition,
    averageRating
} = require('../controllers/conditionsController');

const router = express.Router();

router.post('/', createCondition);

router.get('/:resortId', getConditionsByResort);

router.patch('/:conditionId', updateCondition);

router.delete('/:conditionId', deleteCondition);

router.get('/average-rating/:resortId', averageRating);

module.exports = router;