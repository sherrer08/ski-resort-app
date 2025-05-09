const Trail = require('../models/trailModel');
const Resort = require('../models/resortModel');
const mongoose = require('mongoose');

const createTrail = async (req, res) => {
    const {resort, name, difficulty, status} = req.body;
    
    try {

        const foundResort = await Resort.findById(resort);
        if (!foundResort) {
            return res.status(404).json({message: 'Resort not found'});
        }

        const trail = await Trail.create({ resort, name, difficulty, status });

        foundResort.trails.push(trail._id)

        await foundResort.save();

        res.status(200).json(trail);
    } catch (error) {
        res.status(400).json({ error: error.message })
    };
}

const getTrails = async (req, res) => {
    try {
        const trails = await Trail.find().populate('resort', 'name location');
        res.status(200).json(trails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getTrailsByResort = async (req, res) => {
    const { resortId } = req.params;

    try {
       const trails = await Trail.find({ resort: resortId }).populate('resort', 'name location');

       res.status(200).json(trails);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getTrail = async (req, res) => {
    const { trailId } = req.params;

    try {
        const trail = await Trail.findById(trailId).populate('resort', 'name location');

        if (!trail) {
            return res.status(404).json({ message: 'Trail not found' });
        }

        res.status(200).json(trail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateTrail = async (req, res) => {
    const { trailId } = req.params;
    const { name, difficulty, status } = req.body;

    try {
        const updatedTrail = await Trail.findByIdAndUpdate(
            trailId,
            { name, difficulty, status },
            { new: true, runValidators: true }
        );

        if(!updatedTrail) {
            return res.status(404).json({ message: 'Trail not found' });
        }

        res.status(200).json(updatedTrail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteTrail = async (req, res) => {
    const { trailId } = req.params;

    try {
        const trail = Trail.findById(trailId);
        if(!trail) {
            return res.status(404).json({ message: 'Trail not found' });
        }

        await Resort.findByIdAndDelete(trail.resort, { $pull: { trails: trailId } });

        await Trail.findByIdAndDelete(trailId);

        res.status(200).json({ message: 'Trail deleted' });
    } catch (error) {
        res.status(500).json( { message: error.message } );
    }
}

module.exports = {
    createTrail,
    getTrails,
    getTrailsByResort,
    getTrail,
    updateTrail,
    deleteTrail
}