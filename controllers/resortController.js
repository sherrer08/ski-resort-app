const Resort = require('../models/resortModel');
const mongoose = require('mongoose');

const getResorts = async (req, res) => {
    const resorts = await Resort.find({}).sort({created: -1});

    res.status(200).json(resorts);
};

const getResort = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No resort was found' })
    };

    const resort = await Resort.findById(id);

    if (!resort) {
        return res.status(404).json({ error: 'No resort was found' });
    };

    res.status(200).json(resort);
}

const createResort = async (req, res) => {
    const {name, location, coordinates, trails, lifts, reports} = req.body;

    try {
        const resort = await Resort.create({name, location, coordinates, trails, lifts, reports});
        res.status(200).json(resort);
    } catch (error) {
        res.status(400).json({ error: error.message })
    };

};

const deleteResort = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No resort was found' })
    };

    const resort = await Resort.findOneAndDelete({_id: id});

    if (!resort) {
        return res.status(400).json({ error: 'No resort was found' });
    };

    res.status(200).json(resort);
}

const updateResort = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No resort was found' })
    };

    const resort = await Resort.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!resort) {
        return res.status(400).json({ error: 'No resort was found' });
    };

    res.status(200).json(resort);
}

module.exports = {
    getResorts,
    getResort,
    createResort,
    deleteResort,
    updateResort
};