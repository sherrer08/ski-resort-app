import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConditionsDetails from '../components/ConditionsDetails';
import { Link } from "react-router-dom";

const Reports = () => {
    const { resortId } = useParams();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async() => {
            const response = await fetch(`/api/conditions/${resortId}`);
            const json = await response.json()

            if (response.ok) {
                setReports(json)
            }
        }

        fetchReports()
    }, [resortId])

    return (
        <div className="home">
            <div className="resorts">
            {reports.length > 0 ? (
                reports.map((report) => (
                    <ConditionsDetails key={report._id} report={report} />
                ))
                ) : (
                <p>No condition reports found for this resort.</p>
            )}
            <Link to={'/api/conditions'}>
                <p><strong>Create Condition Report</strong></p>
            </Link>
            </div>
        </div>
    )
}

export default Reports