import React, { } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthCallback from './pages/auth/AuthCallback';
import BBLogin from './pages/auth/BBLogin';
import './css/App.css';
import yourImage from './images/metacare.svg'; // replace with your image file path
const AppContent = ({ }) => {

  const environment = process.env.REACT_APP_ENV || 'Dev';  
  return (

        <Routes>  
          <Route
            path="/auth/callback/:app"
            element={<AuthCallback setIsVerified={true} />}
          />     
          <Route
            path="/"
            element={<BBLogin />}
          />         
        </Routes>
  );
};

const App = () => {


  return (
      <Router>
          <AppContent />
        </Router>

  );
};

export default App;
