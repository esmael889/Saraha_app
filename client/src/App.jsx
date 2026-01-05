import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import SendMessage from './pages/SendMessage';
import Home from './pages/Home'; // Added Home import

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

// Public Route Wrapper (redirect to profile if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  if (token) return <Navigate to="/profile" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <ToastContainer theme="dark" position="bottom-right" />
        <div className="container" style={{ flex: 1, paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />

            <Route path="/send/:userId" element={
              <ProtectedRoute>
                <SendMessage />
              </ProtectedRoute>
            } />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
