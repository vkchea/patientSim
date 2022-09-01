import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/Login/login';
import Homepage from './Homepage/traineehomepage';
import PatientList from './PatientList/patientList';
import NewPatient from './NewPatient/newPatient';
import PatientInformation from './PatientInformation/patientInformation';
import NavBar from './Navbar/Navbar';
import Simulator from './Simulator/Simulator';
import SimulatorReport from './SimulatorReport/SimulatorReport';

function App() {
    return (
      <div className="wrapper">
        <Router>
          <Routes>
            <Route exact path="/homePage" element={ <Homepage  />}>
            </Route>
            <Route exact path="/patientList" element={
              <PatientList />}>
            </Route>
            <Route exact path="/newPatient" element={
              <NewPatient />}>
            </Route>
            <Route exact path="/patientInformation" element={
              <PatientInformation />}>
            </Route>
            <Route exact path="/" element={<Login/>}>
            </Route>
            <Route exact path="/simulatorReport" element={<SimulatorReport  />}>
            </Route>
            <Route exact path="/simulator" element={<Simulator />}>
            </Route>
          </Routes>
        </Router>
      </div>
    );
  }



export default App;
