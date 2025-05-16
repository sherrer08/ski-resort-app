const Condition = require('../models/conditionsModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const createCondition = async (req, res) => {
    const { resort, user, description, rating } = req.body;

    try {
        const condition = await Condition.create({ resort, user: req.user.userId, description, rating });
        res.status(200).json(condition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getConditionsByResort = async (req, res) => {
    const {resortId} = req.params;

    try {
        const conditions = await Condition.find({ resort: resortId }).populate('user', 'username').populate('resort', 'name');
        
        res.status(200).json(conditions);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

const updateCondition = async (req, res) => {
    const { conditionId } = req.params;
    const { description, rating } = req.body;

    try {
        const updatedCondition = await Condition.findByIdAndUpdate(
            conditionId,
            { description, rating },
            { new: true, runValidators: true }
        );

        if(!updatedCondition) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json(updatedCondition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteCondition = async (req, res) => {
    const { conditionId } = req.params;

    try {
        const condition = await Condition.findByIdAndDelete(conditionId);

        if (!condition) {
            return res.status(404).json({ message: "Report not found"});
        }

        res.status(200).json({ message: "Condition report deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const averageRating = async (req, res) => {
    const { resortId } = req.params;
    
    try {
        const average = await Condition.aggregate(
            [
                {
                  '$match': {
                    'resort': new mongoose.Types.ObjectId(resortId)
                  }
                }, {
                  '$group': {
                    '_id': '$resort', 
                    'averageRating': {
                      '$avg': '$rating'
                    }
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'resort': '$_id', 
                    'averageRating': {
                      '$round': [
                        '$averageRating', 2
                      ]
                    }
                  }
                }
              ]
        )

        if (!average.length) {
            return res.status(200).json({ averageRating: 0 });
        }

        res.status(200).json(average[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createCondition,
    getConditionsByResort,
    updateCondition,
    deleteCondition,
    averageRating
}