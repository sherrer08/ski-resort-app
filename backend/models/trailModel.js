const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trailSchema = new Schema({
    resort: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Resort', required: true
        },
    name: {
        type: String,
        required: true
    },
    difficulty: {
        type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        required: true
    },
    status: {
        type: String, enum: ['Open', 'Closed', 'Pending'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Trail', trailSchema)