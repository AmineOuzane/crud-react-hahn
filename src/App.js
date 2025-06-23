import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Login from './component/Login';
import Register from './component/Register';
import Layout from './Layouts/Layout';
import HomePage from './Pages/HomePage';
import ListProduct from './component/ListProduct';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* root → redirect to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* pages without navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
        {/* pages with navbar */}
        <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ListProduct />} />

            
        </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
