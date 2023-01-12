import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useSignup } from '../hooks/useSignup';

export default function SignupForm({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { signup, isPending, error } = useSignup();
  const { user } = useAuthContext();

  const handleSubmit = e => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  useEffect(() => {
    if (user) onClose();
  }, [user, onClose]);

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="heading-2 heading-2--center">Sign up now</h2>
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
      <label>
        <span className="auth-form__label">Display name:</span>
        <input
          type="text"
          required
          onChange={e => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>

      <button
        className="btn btn--large btn--light auth-form__btn--submit"
        disabled={isPending}>
        {isPending ? 'loading...' : 'Sign up'}
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
}
