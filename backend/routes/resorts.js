const express = require('express');
const {
    createResort,
    getResort,
    getResorts,
    deleteResort,
    updateResort,
    updateLiftStatus
} = require('../controllers/resortController');

const router = express.Router();

router.get('/', getResorts);

router.get('/:id', getResort);

router.post('/', createResort);

router.delete('/:id', deleteResort);

router.patch('/:id', updateResort);

router.patch('/lifts/:resortId/:liftId', updateLiftStatus);

module.exports = router;