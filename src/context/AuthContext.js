import { createContext, useEffect, useReducer } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_CHECKED':
      return { ...state, user: action.payload, authIsChecked: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsChecked: false,
  });

  // check the auth state when app first loads
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      dispatch({ type: 'AUTH_IS_CHECKED', payload: user });

      // only want to call the listener once in the beginning
      return () => unsubscribe();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
