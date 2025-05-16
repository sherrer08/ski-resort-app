const { GraphQLID } = require('graphql');
const Resort = require('../../models/resortModel');
const ResortType = require('../types/ResortType');

const resortQueries = {
    getResort: {
        type: ResortType,
        args: { id: { type: GraphQLID } },
        resolve: async (parent, args) => await Resort.findById(args.id)
    }
};

module.exports = resortQueries;