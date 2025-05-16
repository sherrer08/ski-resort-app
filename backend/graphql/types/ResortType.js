const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const TrailType = require('./TrailType');
const CoordinatesType = require('./CoordinatesType');
const Trail = require('../../models/trailModel');

const ResortType = new GraphQLObjectType ({
    name: 'Resort',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        coordinates: {
            type: CoordinatesType,
            resolve: (parent) => parent.coordinates
        },
        trails: {
            type: new GraphQLList(TrailType),
            resolve: async (parent) => await Trail.find({ resort: parent._id })
        }
    })
});

module.exports = ResortType;