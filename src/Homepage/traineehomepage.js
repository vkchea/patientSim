import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import Login from '../Login/login';
import PropTypes from 'prop-types';
import '../Simulator/simulator.css'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

export default function Homepage() {
  const { state } = useLocation();
  console.log(state);
  var userRole = state.role;
  let navigate = useNavigate();
  let path;
  const routeChange = e => {
    if (e.target.id === 'simulator') {
      path = `../simulator`;
      navigate(path);
    } else if (e.target.id === 'patient-list') {
      path = `../patientList`;
      navigate(path, { replace: true });
    } else if (e.target.id === 'new-patient') {
      path = '../newPatient';
      navigate(path);
    } else if (e.target.id === 'simulation-results') {
      path = '../simulatorReport';
      navigate(path);
    } else if(e.target.id === 'logout'){
      path = '../';
      navigate(path)
    }
  }
  console.log(userRole);
  if (userRole !== undefined) {
    console.log(userRole);
    if (userRole === 'trainee') {
      return (
        <div>
          <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Welcome, Virath Chea
                </Typography>
                <Button id="logout" onClick={routeChange} color="inherit">Log Out</Button>
              </Toolbar>
            </AppBar>
          </Box>
          <div class="buttons">
            <Button sx={{  marginBottom: 5, marginLeft: 60, maxWidth: 200 }} id='simulator' onClick={routeChange} variant="contained">Simulation</Button>
          </div>
        </div>
      );
    } else if (userRole === 'provider') {
      return (
        <div>
          <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                 Welcome, Dr. Egipto
                </Typography>
                <Button id="logout" onClick={routeChange} color="inherit">Log Out</Button>
              </Toolbar>
            </AppBar>
          </Box>
          <div class="buttons">
            <Button sx={{  marginBottom: 5, marginLeft: 60, maxWidth: 200 }} onClick={routeChange} id='new-patient' variant="contained">New Patient Bot</Button>
            <Button sx={{  marginBottom: 5, marginLeft: 60, maxWidth: 200 }} onClick={routeChange} id='patient-list' variant="contained">Configure Simulation Bots</Button>
            <Button sx={{  marginBottom: 5, marginLeft: 60, maxWidth: 200 }} onClick={routeChange} id='simulation-results' variant="contained">Evaluate Simulation Reports</Button>
          </div>
        </div>
      );
    } else {
      <Login />
    }
  }
}

Homepage.propTypes = {
  setToken: PropTypes.object
}