import { useParams, useNavigate } from 'react-router-dom';
import UpdateLiftForm from '../components/UpdateLiftForm';
import BackButton from '../components/BackButton';

const UpdateLiftStatus = () => {
  const { resortId, liftId } = useParams();
  const navigate = useNavigate();

  const handleUpdate = async (updateData) => {
    const response = await fetch(`/api/resorts/lifts/${resortId}/${liftId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      alert('Lift status updated!');
      navigate(`/api/resorts/${resortId}`);
    } else {
      alert('Failed to update lift');
    }
  };

  return (
    <div>
      <BackButton />
    <div className="update-lift-container">
      <UpdateLiftForm
        resortId={resortId}
        liftId={liftId}
        onSubmit={handleUpdate}
      />
    </div>
    </div>
  );
};

export default UpdateLiftStatus;
