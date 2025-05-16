const { GraphQLObjectType, GraphQLFloat } = require('graphql');

const CoordinatesType = new GraphQLObjectType({
    name: 'Coordinates',
    fields: () => ({
        latitude: {
            type: GraphQLFloat,
            resolve: (parent) => parent.coordinates[1]
        },
        longitude: {
            type: GraphQLFloat,
            resolve: (parent) => parent.coordinates[0]
        }
    })
});

module.exports = CoordinatesType;