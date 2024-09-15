// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import EnhancedUserProfile from './components/EnhancedUserProfile.jsx';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userProfile" element={<EnhancedUserProfile />} />
      </Routes>
    </Router>
  );
}
export default App;


