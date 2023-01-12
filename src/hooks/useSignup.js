import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';
import { auth } from '../firebase/config';
import { useFirestore } from '../hooks/useFirestore';

export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const { addDocument: addTodosOrder } = useFirestore('todosOrder');

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // manually throw error if connection is bad
      if (!res) throw new Error('Could not complete signup');

      // add display name to user
      await updateProfile(res.user, { displayName });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      // also create todos order for the user
      addTodosOrder({ orderBy: [] }, res.user.uid);

      setIsPending(false);
    } catch (err) {
      console.error(err.message);
      setError(err.message.replace('Firebase: ', ''));
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};
