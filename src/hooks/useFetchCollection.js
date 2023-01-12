import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useFetchCollection = (collectionName, queryArr) => {
  const [documents, setDocuments] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  // run snapshot real-time listener when page loads
  useEffect(() => {
    if (!user) return;
    setIsPending(true);
    setError(null);

    const ref = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      queryArr ? query(ref, where(...queryArr)) : ref,
      snapshot => {
        const results = snapshot.docs.map(docSnap => ({
          ...docSnap.data(),
          id: docSnap.id,
        }));
        setDocuments(results);
        setIsPending(false);
      },
      err => {
        console.log(err.message);
        setError('Could not fetch the data');
        setIsPending(false);
      }
    );

    // cleanup function
    return () => unsubscribe();
    // avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, user, JSON.stringify(queryArr)]);

  return { documents, isPending, error };
};
