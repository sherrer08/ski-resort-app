const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const TrailType = new GraphQLObjectType({
    name: 'Trail',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        difficulty: { type: GraphQLString },
        status: { type: GraphQLString }
    })
});

module.exports = TrailType;