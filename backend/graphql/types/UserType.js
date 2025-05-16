const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLList } = require('graphql');
const ResortType = require('./ResortType');

const UserType = new GraphQLObjectType ({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        isAdmin: { type: GraphQLBoolean },
        favorites: { type: new GraphQLList(ResortType) }
    })
})

module.exports = UserType;