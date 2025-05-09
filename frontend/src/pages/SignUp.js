import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (formData, setError) => {
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to Register.');
        return;
      }

      navigate('/');
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h2>Sign Up</h2>
        <SignUpForm onSubmit={handleSignUp} />
      </div>
    </div>
  );
};

export default SignUp;
