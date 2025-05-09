const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conditionsSchema = new Schema({
    resort: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Resort',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1, 
        max: 5
    }
}, { timestamps: true });

module.exports = mongoose.model('Report', conditionsSchema);