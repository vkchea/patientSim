import { InputLabel, Input, FormControl, Box, Stack, Select, MenuItem, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import { useNavigate } from "react-router-dom";
import './newPatient.css'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function NewPatient() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [reasonOfVisit, setReasonOfVisit] = useState('');
  const [DOB, setDOB] = useState(null);
  const [visitationDate, setVisitationDate] = useState(null);
  const [age, setAge] = useState('');
  const [open, setOpen] = useState(false);

  let navigate = useNavigate(); 
  let path;
  const routeChange = e =>{ 
    if(e.target.id === 'yesButton'){
      path = `../patientList`; 
      navigate(path);
    } else if(e.target.id === 'noButton'){
      path = 'newPatient';
      navigate(path);
    } else if(e.target.id === 'logout'){
      path = '../';
      navigate(path)
    }
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = e =>{
    console.log(e.target.id);
  }
  const handleChange = e => {
    if (e.target.id === 'firstname') {
      setFirstName(e.target.value);
    } else if (e.target.id === 'lastname') {
      setLastName(e.target.value);
    } else if (e.target.id === 'address') {
      setAddress(e.target.value);
    } else if (e.target.id === 'reason-of-visit') {
      setReasonOfVisit(e.target.value);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleOpen();
  }

  return (
    <div>
       <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  New Patient Bot
                </Typography>
                <Button id="logout" onClick={routeChange} color="inherit">Log Out</Button>
              </Toolbar>
            </AppBar>
          </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
          width: '40ch'
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Stack>
          <FormControl variant="standard">
            <InputLabel>First Name</InputLabel>
            <Input id="firstname" value={firstName} onChange={handleChange} />
          </FormControl>
          <br/>
          <FormControl variant="standard">
            <InputLabel>Last Name</InputLabel>
            <Input id="lastname" value={lastName} onChange={handleChange} />
          </FormControl>
          <br/>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Birth"
              value={DOB}
              onChange={(newValue) => {
                setDOB(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br/>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Last Visitation Date"
              value={visitationDate}
              onChange={(newValue) => {
                setVisitationDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br/>
          <FormControl variant="standard">
            <InputLabel>Address</InputLabel>
            <Input id="address" value={address} onChange={handleChange} />
          </FormControl>
          <br/>
          <FormControl variant="standard">
            <InputLabel>Reason for Visit</InputLabel>
            <Input id="reason-of-visit" value={reasonOfVisit} onChange={handleChange} />
          </FormControl>
          <Button id="save-patient" type="submit" variant="contained">
            Save Patient
        </Button>
        </Stack>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Are you sure you want to save?
          </Typography>
          <Button onClick={routeChange} id="yesButton" variant="contained">
            Yes
          </Button>
          <Button onClick={routeChange} id="noButton" variant="contained">
            No
          </Button>
        </Box>
      </Modal>
    </div>
  );
}