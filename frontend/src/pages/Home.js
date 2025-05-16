import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getDistance } from "geolib";
import { useQuery } from "@apollo/client";
import { GET_USER_FAVORITES } from "../graphql/queries";
import HomeDetails from "../components/HomeDetails";

const Home = () => {
    const [resorts, setResorts] = useState([]);
    const [userCoords, setUserCoords] = useState(null);
    const [filterNearby, setFilterNearby] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const { refetch } = useQuery(GET_USER_FAVORITES, {
        variables: { id: user?._id },
        skip: !user || !user._id
    });
    
    console.log('Current User: ', user)

    useEffect(() => {
        const fetchResorts = async () => {
            const response = await fetch('/api/resorts');
            const json = await response.json();

            if (response.ok) {
                setResorts(json);
            };
        };

        fetchResorts();
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserCoords({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error("Location permission denied:", error);
                setUserCoords(null);
            }
        );
    }, []);

    const getFilteredResorts = () => {
        if (!filterNearby || !userCoords) return resorts;

        return resorts
            .map(resort => {
                const coords = resort.coordinates?.coordinates;
                if (!coords) return null;

                const lat = coords[1];
                const lng = coords[0];
                const dist = getDistance(userCoords, { latitude: lat, longitude: lng });
                return {
                    ...resort,
                    distanceMeters: dist
                };
            })
            .filter(resort => resort && resort.distanceMeters <= 80467);
    }

    return (
        <div className="home">
            <div className="resorts">
                <div className="resorts-filter">
                    <label htmlFor="nearby-toggle">
                    <input 
                        type="checkbox"
                        checked={filterNearby}
                        onChange={() => setFilterNearby(!filterNearby)}
                    />
                        Show resorts within 50 miles
                    </label>
                </div>

                {getFilteredResorts().map((resort) => (
                    <HomeDetails 
                        key={resort._id}
                        resort={resort}
                        user={user}
                        setUser={setUser}
                        distanceMeters={resort.distanceMeters}
                        refetchFavorites={refetch}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;