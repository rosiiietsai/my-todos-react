import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import Modal from './Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function Header() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <div className="header">
      <h1 className="heading-1">
        {user ? `${user.displayName}'s` : 'My'} Todos
      </h1>
      <ul className="header__auth">
        {!user && (
          <li
            className="btn btn--inline"
            onClick={() => setShowSignupModal(true)}>
            Signup
          </li>
        )}
        {!user && (
          <li
            className="btn btn--inline"
            onClick={() => setShowLoginModal(true)}>
            Login
          </li>
        )}
        {user && (
          <li className="btn btn--inline" onClick={() => logout()}>
            Logout
          </li>
        )}
      </ul>
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignupForm onClose={() => setShowSignupModal(false)} />
        </Modal>
      )}
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm onClose={() => setShowLoginModal(false)} />
        </Modal>
      )}
    </div>
  );
}
