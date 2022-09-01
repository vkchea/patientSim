import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Modal } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import '../Simulator/simulator.css';

export default function Homepage() {
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
  var user = "Virath Chea";
  var patient = "Henry Lu";

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  function createPatientData(id, patientname, lastvisited, reasonofvisit) {
    return { id, patientname, lastvisited, reasonofvisit };
  }

  const patientList = [
    createPatientData("1", "Henry Lu", "11/25/2021", "Physical"),
    createPatientData("2", "Derick Chauven", "10/12/2021", "Physical"),
    createPatientData("3", "Garret Londer", "09/02/2021", "Injury"),
    createPatientData("4", "Alyssa Mag", "09/01/2021", "Hair Loss"),
    createPatientData("5", "Morris Fao", "08/20/2021", "Physical"),
    createPatientData("6", "Gordon Ra", "08/19/2021", "Blood Draw")
  ]


  function createBotData(id, patient_id, process, question_number, question, asked_by, answer) {
    return { id, patient_id, process, question_number, question, asked_by, answer };
  }
  function createReportData(user, question, answer) {
    return { user, question, answer };
  };

  const botSimulationInitial = [
    // createBotData("1", "1", "Introduction", "1", "How is it going?", "Dr. Egipto", "Good."),
    // createBotData("2", "1", "Introduction", "2", "You are here for a physical, correct?", "Dr. Egipto", "Yes, I am here for a physical."),
    // createBotData("3", "1", "Health History", "3", "Do you have any allergies?", "Dr. Egipto", "Yes. I am concerned about my allergies to some fruits like apples, cherries, and pears."),
    // createBotData("4", "1", "Health History", "4", "What should I do?", "Henry Lu", "I will prescribe you some medicine."),
    // createBotData("5", "1", "Health History", "5", "Are you on any new medication?", "Dr. Egipto", "I am not."),
    // createBotData("6", "1", "Health History", "6", "Have you had any surgeries done?", "Dr. Egipto", "I have not."),
    // createBotData("7", "1", "Vital Sign Check", "7", "I am going to take your blood pressure reading now.", "Dr. Egipto", "Ok."),
    createBotData("8", "1", "Vital Sign Check", "8", "I am going to check your heart rate now.", "Dr. Egipto", "Ok."),
    createBotData("9", "1", "Vital Sign Check", "9", "I am going to check your respiratory rate.", "Dr. Egipto", "Ok."),
    createBotData("10", "1", "Visual Exam", "10", "I am going to take a look at your head.", "Dr. Egipto", "Ok."),
    createBotData("11", "1", "Visual Exam", "11", "I am going to take a look at your eyes.", "Dr. Egipto", "Ok."),
    createBotData("12", "1", "Visual Exam", "12", "I am going to take a look at your chest.", "Dr. Egipto", "Ok."),
    createBotData("13", "1", "Visual Exam", "13", "I am going to take a look at your abdomen.", "Dr. Egipto", "Ok."),
    createBotData("14", "1", "Physical Exam", "14", "I am going to listen to your heart.", "Dr. Egipto", "Ok."),
    createBotData("15", "1", "Physical Exam", "15", "I am going to listen to your lungs.", "Dr. Egipto", "Yes"),
  ]

  var reportInitial = [];
  const [visitationNotes, setVisitationNotes] = useState(botSimulationInitial);
  const [report, setReport] = useState(reportInitial);
  const [reportSize, setReportSize] = useState(0);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - patientList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [selected, setSelected] = useState(0);
  const [simulationStart, setSimulationStart] = useState(0);

  var selectedUserId;
  const handlePatientName = e => {
    selectedUserId = e.target.id;
    setSelected(!selected);
  }

  const handleSimulationOpen = () => {
    setSimulationStart(!simulationStart);
  }
  const handleSummaryOpen = () => {

  }

  var text;
  var scriptBuild = document.createElement("div");
  function fillScript() {
    let header = '';
    for (let i = 0; i < visitationNotes.length; i++) {
      if (header !== visitationNotes[i].process) {
        header = visitationNotes[i].process;
        text = document.createTextNode(header);
        var h = document.createElement("h2");
        h.appendChild(text);
        var p = document.createElement("p");
        scriptBuild.appendChild(h);
        text = document.createTextNode(visitationNotes[i].question);
        p.appendChild(text);
        scriptBuild.appendChild(p);
      } else if (visitationNotes[i].asked_by === 'Dr. Egipto') {
        text = document.createTextNode(visitationNotes[i].question);
        var p = document.createElement("p");
        p.appendChild(text);
        scriptBuild.appendChild(p);
      }
    }
  }

  const [openScripts, setOpenScripts] = React.useState(true);
  const handleScriptsOpen = () => {
    setOpenScripts(!openScripts);
    console.log(openScripts);
    if (openScripts === true) {
      fillScript();
      document.getElementById("box").appendChild(scriptBuild);
    } else {
      document.getElementById("box").innerHTML = "";
    }
  }

  const [response, setResponse] = useState('');
  const [patientQuestion, setPatientQuestion] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const handleChange = e => {
    setResponse(e.target.value);
  };
  var ul = document.getElementById("chat");

  const submitResponse = () => {
    if (patientQuestion === true) {
      reportInitial = report;
      reportInitial.push(createReportData(user, visitationNotes[chatCount].question, response));
      console.log(reportInitial);
      var userResponse = document.createElement("li");
      var bUser = document.createElement("b");
      var pUser = document.createElement("p");
      pUser.innerText = response;
      bUser.innerText = "Saving Response. You may continue on with the script.";
      userResponse.appendChild(pUser);
      userResponse.appendChild(bUser);
      ul.appendChild(userResponse);
      visitationNotes.shift();
      setPatientQuestion(false);
      var objDiv = document.getElementById("chat");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    else if ((visitationNotes[chatCount].question === response) && chatCount <= visitationNotes.length) {
      reportInitial = report;
      reportInitial.push(createReportData(user, visitationNotes[chatCount].question, response));
      console.log(reportInitial);
      userResponse = document.createElement("li");
      bUser = document.createElement("b");
      pUser = document.createElement("p");
      bUser.innerText = user + ": ";
      pUser.innerText = response;
      userResponse.appendChild(bUser);
      userResponse.appendChild(pUser);
      ul.appendChild(userResponse);

      var patientResponse = document.createElement("li");
      var bPatient = document.createElement("b");
      var pPatient = document.createElement("p");
      bPatient.innerText = patient + ": ";
      pPatient.innerText = visitationNotes[chatCount].answer;
      patientResponse.appendChild(bPatient);
      patientResponse.appendChild(pPatient);
      ul.appendChild(patientResponse);

      objDiv = document.getElementById("chat");
      objDiv.scrollTop = objDiv.scrollHeight;
      visitationNotes.shift();
      if (visitationNotes.length !== 0 && visitationNotes[chatCount].asked_by === patient) {
        patientResponse = document.createElement("li");
        bPatient = document.createElement("b");
        pPatient = document.createElement("p");
        bPatient.innerText = patient + ": ";
        pPatient.innerText = visitationNotes[chatCount].question;
        patientResponse.appendChild(bPatient);
        patientResponse.appendChild(pPatient);

        ul.appendChild(patientResponse);

        bPatient = document.createElement("b");
        bPatient.innerText = "Answer " + patient + "'s question, and give a reason for your response.";
        patientResponse.appendChild(bPatient);
        ul.appendChild(patientResponse);

        objDiv.scrollTop = objDiv.scrollHeight;
        setPatientQuestion(true);
      }
      setResponse("");
    }

    
    if (visitationNotes.length === 0) {
      console.log(reportInitial);
      setSaveReport(true);
    }
  }
  const [saveReport, setSaveReport] = useState(false);
  const openSaveReport = () => {
  }
  const handleCloseReportSave = () => {
    setSaveReport(false);
    navigate('/homePage', {state: {
      username: 'virathc',
      password: '12345',
      role: 'trainee'
    }});
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 300,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
  return (
    <div>
      <Modal
          open={saveReport}
          onClose={handleCloseReportSave}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <p>Your have completed the simulation. </p>
              <p> The results have been saved, and sent to be evaluated.</p>
            <Button sx={{ marginTop: 24, marginLeft: 55 }} variant="contained" onClick={handleCloseReportSave}>Exit</Button>
        </Box> 
    </Modal>
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                 Patient Simulator
                </Typography>
                <Button id="logout" onClick={routeChange} color="inherit">Log Out</Button>
              </Toolbar>
            </AppBar>
          </Box>
      {simulationStart ?
        <div class="simulator">
          <div id="script-div">
            <Button onClick={handleScriptsOpen} id='trainee-script' variant="contained">Script</Button>
            <div id="box">
            </div>
          </div>
          <div id="chat-div">
            <div id="chatbox">
              <ul id="chat">
                <li><i>Please open up the script and type into the response box the following lines to progress through the simulation.</i></li>
              </ul>
            </div>
            <div id="chatbox-bottom">
              <TextField
                id="outlined-multiline-static"
                label="Response"
                multiline
                rows={4}
                defaultValue=""
                value={response}
                onChange={handleChange}
              />
              <Button variant="contained" sx={{ marginLeft: 2, marginTop: 10.5, height: 40, minWidth: 200, maxWidth: 500 }} onClick={submitResponse}>
                Enter
              </Button>
            </div>
          </div>
        </div>
        :
        <div class="row">
          <div id="simulator-description">
            <p>
              Welcome to the <b>Patient Simulator.</b>
              <br />
              Select a patient,
              and start the simulation <br />  when
              you are ready.
            </p>
          </div>
          <div>
            <TableContainer sx={{ marginLeft: 3}}>
              <Table sx={{ minWidth: 200, maxWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                  <TableRow>
                    <TableCell > Patient Name</TableCell>
                    <TableCell align="right">Date of Visit</TableCell>
                    <TableCell align="right">Reason of Visit&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? patientList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : patientList
                  ).map((row) => (
                    <TableRow key={row.id} sx={{ "&:hover": {backgroundColor: '#2979ff'}}}>
                      <TableCell sx={{ cursor: 'pointer', "&:hover": {color: 'white'}}} id={row.id} component="th" scope="row" onClick={handlePatientName} >
                        {row.patientname}
                      </TableCell>
                      <TableCell style={{ width: 100 }} align="right">
                        {row.lastvisited}
                      </TableCell>
                      <TableCell style={{ width: 100 }} align="right">
                        {row.reasonofvisit}
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={3}
                      count={patientList.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
          {selected ? <div>
              <div class="buttons">
              {/* <Button sx={{marginBottom: 5, marginTop: 15, marginLeft: 15, marginRight: 'auto', minWidth: 200}} onClick={handleScriptsOpen} id='trainee-script' variant="contained">Script</Button> */}
            </div>
              <div class="buttons">
              <Button sx={{marginBottom: 5, marginTop: 20, marginLeft: 15, marginRight: 'auto', minWidth: 200}} onClick={handleSimulationOpen} id='start-simulation' variant="contained">Start Simulation</Button>
            </div>
          </div> : <div> </div>
          }
        </div>
      }
    </div>
  );
}