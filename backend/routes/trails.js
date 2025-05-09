const express = require('express');
const {
    createTrail,
    getTrails,
    getTrailsByResort,
    getTrail,
    updateTrail,
    deleteTrail
} = require('../controllers/trailsController')

const router = express.Router();

router.post('/', createTrail);

router.get('/', getTrails);

router.get('/resort/:resortId', getTrailsByResort);

router.get('/trail/:trailId', getTrail);

router.patch('/:trailId', updateTrail);

router.delete('/:trailId', deleteTrail);


module.exports = router;