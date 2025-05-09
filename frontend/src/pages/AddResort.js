import ResortForm from '../components/ResortForm';
import { useNavigate } from 'react-router-dom';

const AddResort = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleAddResort = async (resortData, setError) => {
        try {
            const res = await fetch('/api/resorts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(resortData),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to add resort');
            }

            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='login-container'>
            <h2>Add New Resort</h2>
            <ResortForm onSubmit={handleAddResort}/>
        </div>
    );
};

export default AddResort;