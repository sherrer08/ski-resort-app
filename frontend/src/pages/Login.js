import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials, setError) => {
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      localStorage.setItem(
        'user',
        JSON.stringify({
          ...data.user,
          token: data.token,
        })
      );

      navigate('/');
    } catch (err) {
      setError('An error occurred, please try again.');
    }
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h2>Login</h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
