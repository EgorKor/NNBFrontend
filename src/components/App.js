import './App.css';
import './LoginForm'
import './Dashboard'
import Dashboard from './Dashboard';
import LoginForm from './LoginForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import CalcAngle from './CalcAngle'
import CalcVertical from './CalcVertical';
import CalcAzimuth from './CalcAzimuth';
import CalcIntensity from './CalcIntensity';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} 
          />

          <Route path="/dashboard/calcAngle" element={
            <ProtectedRoute>
              <CalcAngle/>
            </ProtectedRoute>
          }/>
          <Route path="/dashboard/calcVertical" element ={
            <ProtectedRoute>
              <CalcVertical/>
            </ProtectedRoute>
          }/>
          <Route path="/dashboard/calcAzimuth" element={
              <ProtectedRoute>
                <CalcAzimuth/>
              </ProtectedRoute>
          }/>
          <Route path="/dashboard/calcIntensity" element={
            <ProtectedRoute>
              <CalcIntensity/>
            </ProtectedRoute>
          }/>
      </Routes>
    </Router>
  );
}

export default App;
