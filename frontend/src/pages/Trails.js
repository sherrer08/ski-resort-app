import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TRAILS_BY_RESORT } from "../graphql/queries";
import TrailsDetails from "../components/TrailsDetails";
import BackButton from "../components/BackButton";

const Trails = () => {
    const { resortId } = useParams()
    const { loading, error, data } = useQuery(GET_TRAILS_BY_RESORT, {
        variables: {id: resortId},
    });

    if (loading) return <p>Loading Trails...</p>;
    if (error) return <p>Error loading trails...</p>;

    const trails = data.getResort?.trails || [];

    return (
        <div>
            <BackButton />
        <div className="home">
            <div className="resorts">
                {trails.length > 0 ? (
                    trails.map((trail) => (
                        <TrailsDetails key={trail._id} trail={trail} />
                    ))
                    ) : (
                    <p>No trails found for this resort.</p>
                    )}
            </div>
        </div>
        </div>
    )
}

export default Trails;