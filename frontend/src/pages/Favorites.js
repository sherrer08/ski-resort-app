import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_FAVORITES } from "../graphql/queries";
import { REMOVE_FAVORITE } from "../graphql/mutations";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import FavoritesCard from "../components/FavoritesCard";
import BackButton from "../components/BackButton";

const FavoritesPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
        refetchQueries: [
            {
                query: GET_USER_FAVORITES,
                variables: { id: user._id }
            }
        ],
        awaitRefetchQueries: true
    });
    const { loading, error, data } = useQuery(GET_USER_FAVORITES, {
        variables: { id: user?._id },
        skip: !user,
        fetchPolicy: "network-only"
    });

    const handleRemoveFavorite = async (resortId) => {
        try {
            const { data: mutationData } = await removeFavorite({
                variables: {
                    userId: user._id,
                    resortId: resortId
                }
            });

            if(mutationData?.removeFavorite) {
                const updatedUser = {
                    ...user,
                    favorites: mutationData.removeFavorite.favorites.map(fav => fav._id)
                };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } else {
                console.error('Failed to remove favorite');
            }
        } catch (error) {
            console.error('Error remmoving favorite:', error);
        }
    };

    if (loading) return <div>Loading Favorites...</div>;
    if (error || !data?.getUser) return <div>Error loading favorites.</div>

    const favorites = data.getUser.favorites;

    return (
        <div className="favorites-container">
            <BackButton />
            <h2>Your Favorite Resorts</h2>
            {favorites.length === 0 ? (
                <p className="no-favorites">You haven't added any favorites yet.</p>
            ) : (
                <div className="favorites-list">
                    {favorites.map((resort) => (
                        <FavoritesCard 
                            key={resort._id}
                            resort={resort}
                            onRemove={handleRemoveFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;