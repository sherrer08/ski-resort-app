const { GraphQLID } = require('graphql');
const UserType = require('../types/UserType');
const User = require('../../models/userModel');

const userQueries = {
    getUser: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        async resolve(parent, args) {
            return await User.findById(args.id).populate('favorites');
        }
    }
};

module.exports = userQueries;