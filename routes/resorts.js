const express = require('express');
const {
    createResort,
    getResort,
    getResorts,
    deleteResort,
    updateResort
} = require('../controllers/resortController');

const router = express.Router();

router.get('/', getResorts);

router.get('/:id', getResort);

router.post('/', createResort);

router.delete('/:id', deleteResort);

router.patch('/:id', updateResort);


module.exports = router;