import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogin } from '../hooks/useLogin';

export default function LoginForm({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();
  const { user } = useAuthContext();

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (user) onClose();
  }, [user, onClose]);

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="heading-2 heading-2--center">Login</h2>
      <label>
        <span className="auth-form__label">Email:</span>
        <input
          type="email"
          required
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span className="auth-form__label">Password:</span>
        <input
          type="password"
          required
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <button
        className="btn btn--large btn--light auth-form__btn--submit"
        disabled={isPending}>
        {isPending ? 'loading...' : 'Login'}
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
}
