import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Upload from './pages/Upload';
import DocumentDetail from './pages/DocumentDetail';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import { Toaster } from 'sonner';

// Mock authentication status
const isAuthenticated = true;

export default function App() {
  return (
    <Router>
      <Toaster richColors />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route 
          path='/*' 
          element={isAuthenticated ? <MainApp /> : <Navigate to='/login' />}
        />
      </Routes>
    </Router>
  );
}

function MainApp() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='upload' element={<Upload />} />
        <Route path='documents/:id' element={<DocumentDetail />} />
        <Route path='chat' element={<Chat />} />
        <Route path='settings' element={<Settings />} />
        <Route path='admin' element={<Admin />} />
        {/* Redirect any other nested paths to the dashboard */}
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  )
}