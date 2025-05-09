const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resortSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    trails: [{
        type: Schema.Types.ObjectId,
        ref: "Trail"
    }],
    lifts: [{
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Open', 'Closed', 'Maintenence'],
            default: 'Open'
        },
        waitTime: {
            type: Number,
            default: 0
        }
    }],
    coordinates: {
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    reports: [{
        type: Schema.Types.ObjectId,
        ref: 'Report'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Resort', resortSchema);