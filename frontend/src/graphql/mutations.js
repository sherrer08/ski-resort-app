import { gql } from '@apollo/client';

export const REMOVE_FAVORITE = gql`
    mutation RemoveFavorite($userId: ID!, $resortId: ID!) {
        removeFavorite(userId: $userId, resortId: $resortId) {
            _id
            favorites {
                _id
                name
                location
            }
        }
    }
`;