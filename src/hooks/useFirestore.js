import { useReducer } from 'react';
// prettier-ignore
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc} from 'firebase/firestore';
import { db } from '../firebase/config';

const initialState = {
  document: null,
  isPending: false,
  isSuccess: false,
  error: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        ...state,
        document: null,
        isPending: true,
        isSuccess: false,
        error: null,
      };
    case 'ADDED_DOC':
      return {
        ...state,
        document: action.payload,
        isPending: false,
        isSuccess: true,
        error: null,
      };
    case 'DELETED_DOC':
      return {
        ...state,
        document: null,
        isPending: false,
        isSuccess: true,
        error: null,
      };
    case 'UPDATED_DOC':
      return {
        ...state,
        document: action.payload,
        isPending: false,
        isSuccess: true,
        error: null,
      };
    case 'ERROR':
      return {
        ...state,
        document: null,
        isPending: false,
        isSuccess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = collectionName => {
  const [state, dispatch] = useReducer(firestoreReducer, initialState);

  const addDocument = async (document, id) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const ref = id
        ? doc(db, collectionName, id)
        : collection(db, collectionName);
      const addedDocument = id
        ? await setDoc(ref, document)
        : await addDoc(ref, document);
      dispatch({ type: 'ADDED_DOC', payload: addedDocument });
    } catch (err) {
      console.error(err.message);
      dispatch({ type: 'ERROR', payload: err.message });
    }
  };

  const deleteDocument = async id => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const ref = doc(db, collectionName, id);
      await deleteDoc(ref);
      dispatch({ type: 'DELETED_DOC' });
    } catch (err) {
      console.error(err.message);
      dispatch({ type: 'ERROR', payload: 'Could not delete' });
    }
  };

  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const ref = doc(db, collectionName, id);
      const updatedDocument = await updateDoc(ref, updates);
      dispatch({ type: 'UPDATED_DOC', payload: updatedDocument });
    } catch (err) {
      console.error(err.message);
      dispatch({ type: 'ERROR', payload: err.message });
    }
  };

  return { addDocument, deleteDocument, updateDocument, state };
};
