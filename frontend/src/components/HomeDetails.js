import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HomeDetails = ({ resort, user, setUser, distanceMeters, refetchFavorites }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (user?.favorites?.includes(resort._id)) {
      setIsFavorited(true);
    }
  }, [user, resort._id]);
  
  const handleFavorite = async () => {
        if (!user) {
          alert("Please log in to favorite resorts");
          return;
        }

        if (isFavorited) return;
    
        try {
          const response = await fetch(`/api/users/favorites/${user._id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ resortId: resort._id }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            const updatedUser = {
              ...user,
              favorites: [...user.favorites, resort._id],
            };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            alert('Resort added to favorites!')

            if (refetchFavorites) {
              refetchFavorites();
            }
            
          } else {
            alert(data.message || "Something went wrong");
          }
        } catch (error) {
          console.error("Error adding favorite:", error);
        }
      };

    return (
        <div className="home-details">
            <Link to={`/api/resorts/${resort._id}`}>
                <h4>{resort.name}</h4>
            </Link>
            <p><strong> Location: </strong>{resort.location}</p>
            {distanceMeters && (
              <p><strong>Distance:</strong> {(distanceMeters / 1609).toFixed(1)} miles</p>
            )}
            <p>{resort.createdAt}</p>

            {user && (
                <button onClick={handleFavorite} className={`favorite-button ${isFavorited ? "favorited" : ""}`}>
                    {isFavorited ? "Favorited" : "Favorite"}
                </button>
            )}
        </div>
    );
};

export default HomeDetails;