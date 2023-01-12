import './styles/style.scss';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="app">
      <Header />
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/update/:id"
              element={user ? <Update /> : <Navigate to="/" />}
            />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/" />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
