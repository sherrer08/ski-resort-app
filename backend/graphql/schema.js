const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const resortQueries = require('./queries/resortQueries');
const userQueries = require('./queries/userQueries');
const userMutations = require('./mutations/userMutations');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...resortQueries,
        ...userQueries
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        ...userMutations
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});