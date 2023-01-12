import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // login user
      const res = await signInWithEmailAndPassword(auth, email, password);

      // manually throw error if connection is bad
      if (!res) throw new Error('Could not login :(');

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      setIsPending(false);
    } catch (err) {
      console.error(err.message);
      setError(err.message.replace('Firebase: ', ''));
      setIsPending(false);
    }
  };

  return { login, isPending, error };
};
