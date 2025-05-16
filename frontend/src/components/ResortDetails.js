import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"
import BackButton from "./BackButton";

const ResortDetails = ({ resort }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const lat = resort.coordinates?.coordinates[1];
    const lng = resort.coordinates?.coordinates[0];
    console.log("Resort coordinates:", lat, lng);

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        inconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    return (
        <div>
            <BackButton />
        <div className="resort-details-container">
            <h4>{resort.name}</h4>
            <p><strong>Location: </strong>{resort.location}</p>
            <Link to={`/api/trails/resort/${resort._id}`} className="resort-link">
                <p><strong>View Trails </strong><FaArrowRight className="icon arrow-icon" /></p>
            </Link>
            <h5>Lifts: </h5>
            {resort.lifts && resort.lifts.length > 0 ? (
                <ul className="lift-list">
                    {resort.lifts.map((lift) =>(
                        <li key={lift._id}>
                            <strong>{lift.name}</strong> - Status: <em>{lift.status}</em>, Wait Time: {lift.waitTime} min
                            {user?.isAdmin === true && (
                                <Link to={`/update-lift/${resort._id}/${lift._id}`}>
                                    <button className='favorite-button' style={{ marginLeft: "10px" }}>
                                        Update Lift Status
                                    </button>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No lifts available</p>
            )}
            <Link to={`/api/conditions/${resort._id}`} className="resort-link">
                <p><strong>View Condition Reports </strong><FaArrowRight className="icon arrow-icon" /></p>
            </Link>
            {lat && lng ? (
                <>
                <h5 className="map-label">Resort Map</h5>
                <div className="resort-map-container">
                <MapContainer center={[lat, lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                    <TileLayer 
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org.copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[lat, lng]}>
                        <Popup>{resort.name}</Popup>
                    </Marker>
                </MapContainer>
            </div>
            </>
            ) : (
                <p>Location data not available</p>
            )}
        </div>
        </div>
    )
}

export default ResortDetails;