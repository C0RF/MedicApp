import React from "react"
import { BrowserRouter, HashRouter, Route } from "react-router-dom"

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Diagnosis from './pages/Diagnosis';
import Diseases from './pages/Diseases';
import FirstAid from './pages/FirstAid';
import NearestHospitals from './pages/NearestHospitals';
import './App.css';
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        {/* <Route path="/signin" component={SigninScreen} exact /> */}
        <Route path="/" component={Home} exact />
        <Route path="/diagnosis" component={Diagnosis} exact />
        <Route path="/diseases" component={Diseases} exact />
        <Route path="/firstAid" component={FirstAid} exact />
        <Route path="/nearestHospitals" component={NearestHospitals} exact />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;