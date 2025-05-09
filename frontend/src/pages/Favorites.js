import { useEffect, useState } from "react";
import FavoritesCard from "../components/FavoritesCard";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect (() => {
        const fetchData = async () => {
            try {
                const userRes = await fetch(`/api/users/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                const userData = await userRes.json();

                const resortsRes = await fetch('/api/resorts');
                const resortsData = await resortsRes.json();

                const favoriteResorts = resortsData.filter((resort) => 
                    userData.favorites.includes(resort._id)
                );

                setFavorites(favoriteResorts);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load favorites:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleRemoveFavorite = async (resortId) => {
        try {
            const res = await fetch(`/api/users/favorites/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({ resortId })
            });

            if(res.ok) {
                setFavorites(prev => prev.filter(resort => resort._id !== resort._id));
            } else {
                console.error('Failed to remove favorite');
            }
        } catch (error) {
            console.error('Error remmoving favorite:', error);
        }
    };

    if (loading) return <div>Loading Favorites...</div>;

    return (
        <div className="favorites-container">
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