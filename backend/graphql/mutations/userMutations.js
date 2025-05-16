const { GraphQLID } = require('graphql');
const UserType = require('../types/UserType');
const User = require('../../models/userModel');

const userMutations = {
    removeFavorite: {
        type: UserType,
        args: {
            userId: { type: GraphQLID },
            resortId: { type: GraphQLID }
        },
        async resolve(parent, { userId, resortId }) {
            const user = await User.findByIdAndUpdate(
                userId,
                { $pull: { favorites: resortId } },
                { new: true }
            ).populate('favorites');
            return user;
        }
    }
}

module.exports = userMutations;