import { Link } from "react-router-dom"

const HomeDetails = ({ resort, user }) => {
    const handleFavorite = async () => {
        if (!user) {
          alert("Please log in to favorite resorts");
          return;
        }
    
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
            alert("Resort added to favorites!");
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
            <p>{resort.createdAt}</p>

            {user && (
                <button onClick={handleFavorite} className="favorite-button">
                    Favorite
                </button>
            )}
        </div>
    );
};

export default HomeDetails;