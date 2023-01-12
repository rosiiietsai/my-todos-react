import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useFetchDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  // run snapshot real-time listener when page loads
  useEffect(() => {
    if (!user) return;
    setIsPending(true);
    setError(null);

    const ref = doc(db, collection, id);
    const unsubscribe = onSnapshot(
      ref,
      snapshot => {
        // manually check for invalid id
        if (!snapshot.exists()) return setError('No such document exists');
        setDocument({ ...snapshot.data(), id: snapshot.id });
        setIsPending(false);
      },
      err => {
        console.error(err.message);
        setError('Failed to get document');
        setIsPending(false);
      }
    );

    // cleanup function
    return () => unsubscribe();
  }, [collection, id, user]);

  return { document, isPending, error };
};
