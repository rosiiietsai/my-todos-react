import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';
import { auth } from '../firebase/config';

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    if (!user) return setIsPending(false);

    setError(null);
    setIsPending(true);

    try {
      // sign the user out
      await signOut(auth);

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

      // update state
      setIsPending(false);
    } catch (err) {
      console.error(err.message);
      setError(err.message.replace('Firebase: ', ''));
      setIsPending(false);
    }
  };

  return { logout, isPending, error };
};
