import { gql } from '@apollo/client';

export const GET_TRAILS_BY_RESORT = gql`
    query GetResort($id: ID!) {
        getResort(id: $id) {
            name
            trails {
                _id
                name
                difficulty
                status
            }
        }
    }
`;

export const GET_USER_FAVORITES = gql`
    query GetUser($id: ID!) {
        getUser(id: $id) {
            _id
            favorites {
                _id
                name
                location
            }
        }
    }
`;