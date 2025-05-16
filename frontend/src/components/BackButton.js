import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (window.history.length > 1) {
            setShow(true);
        }
    }, []);

    if (!show) return null;

    return (
        <button onClick={handleBack} className="back-button">
            <FaArrowLeft className="icon back-icon"/>Back
        </button>
    )
};

export default BackButton;