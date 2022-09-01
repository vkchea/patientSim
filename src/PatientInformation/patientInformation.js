import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import './patientInformation.css'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Input } from '@mui/material';

export default function PatientInformation() {
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
    } else if (e.target.id === 'logout') {
      path = '../';
      navigate(path)
    }
  }
  function createData(id, patient_id, process, question_number, question, asked_by, answer) {
    return { id, patient_id, process, question_number, question, asked_by, answer };
  }

  const visitationNotesInitial = [
    createData("1", "1", "Introduction", "1", "How is it going?", "Dr. Egipto", "Good."),
    createData("2", "1", "Introduction", "2", "You are here for a physical, correct?", "Dr. Egipto", "Yes, I am here for a physical."),
    createData("3", "1", "Health History", "3", "Do you have any allergies?", "Dr. Egipto", "Yes. I am concerned about my allergies to some fruits like apples, cherries, and pears."),
    createData("4", "1", "Health History", "4", "What should I do?", "Henry Lu", "I will prescribe you some medicine, if you'd like."),
    createData("5", "1", "Health History", "5", "Yes I would like that, thank you.", "Henry Lu", "Sure."),
    createData("6", "1", "Health History", "6", "Are you on any new medication?", "Dr. Egipto", "I am not."),
    createData("7", "1", "Health History", "7", "Have you had any surgeries done?", "Dr. Egipto", "I have not."),
    createData("8", "1", "Vital Sign Check", "8", "I am going to take your blood pressure reading now.", "Dr. Egipto", "Ok."),
    createData("9", "1", "Vital Sign Check", "9", "I am going to check your heart rate now.", "Dr. Egipto", "Ok."),
    createData("10", "1", "Vital Sign Check", "10", "I am going to check your respiratory rate.", "Dr. Egipto", "Ok."),
    createData("11", "1", "Visual Exam", "11", "I am going to take a look at your head.", "Dr. Egipto", "Ok."),
    createData("12", "1", "Visual Exam", "12", "I am going to take a look at your eyes.", "Dr. Egipto", "Ok."),
    createData("13", "1", "Visual Exam", "13", "I am going to take a look at your chest.", "Dr. Egipto", "Ok."),
    createData("14", "1", "Visual Exam", "14", "I am going to take a look at your abdomen.", "Dr. Egipto", "Ok."),
    createData("15", "1", "Physical Exam", "15", "I am going to listen to your heart.", "Dr. Egipto", "Ok."),
    createData("16", "1", "Physical Exam", "16", "I am going to listen to your lungs.", "Dr. Egipto", "Yes"),
  ]

  const { state } = useLocation();
  // console.log(state);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const script_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  const [openBot, setOpenBot] = React.useState(false);
  const [openSummary, setOpenSummary] = React.useState(false);
  const [openScripts, setOpenScripts] = React.useState(false);
  const [visitationNotes, setVisitationNotes] = useState(visitationNotesInitial);
  const [count, setCount] = useState(7);
  const handleBotOpen = () => setOpenBot(true);
  const handleSummaryOpen = () => setOpenSummary(true);
  const handleScriptsOpen = () => setOpenScripts(true);
  const handleScriptGeneration = () => {
    fillScript();
  }
  const handleBotClose = () => setOpenBot(false);
  const handleSummaryClose = () => setOpenSummary(false);
  const handleScriptsClose = () => setOpenScripts(false);

  // console.log(visitationNotes)

  const handleAddToBot = () => {
    console.log("Adding another row to Bot");
    let countToString = count.toString();
    visitationNotes.push(createData(countToString, "1", process, "7", question, askedBy, answer));
    setVisitationNotes(visitationNotes);
    setCount(count + 1);
  }

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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - visitationNotes.length) : 0;

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    console.log("changing page");
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("changing rows");
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  var text;
  function fillScript() {
    let header = '';
    var scriptBuild = document.getElementById("box");
    for (let i = 0; i < visitationNotes.length; i++) {
      if (header !== visitationNotes[i].process) {
        header = visitationNotes[i].process;
        text = document.createTextNode(header);
        var h = document.createElement("h2");
        h.appendChild(text);
        console.log(h);
        var p = document.createElement("p");
        scriptBuild.appendChild(h);
        console.log(scriptBuild);
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

  const [process, setProcess] = React.useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [askedBy, setAskedBy] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    if(event.target.id === 'question'){
      setQuestion(event.target.value);
    }  else if(event.target.id === 'answer'){
      setAnswer(event.target.value);
    }
  };

  const handleProcessChange = e => {
    console.log(e);
    setProcess(e.target.value);
  }
  const handleAskedBy = e => {
    setAskedBy(e.target.value);
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Patient Bots
            </Typography>
            <Button id="logout" onClick={routeChange} color="inherit">Log Out</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div class="buttons">
        <Button sx={{ marginBottom: 5, marginLeft: 60, maxWidth: 200 }} onClick={handleBotOpen} id='patient-bot' variant="contained">Patient Bot</Button>
        <Button sx={{ marginBottom: 5, marginLeft: 60, maxWidth: 200 }} onClick={handleScriptsOpen} id='standard-scripts' variant="contained">Script</Button>
      </div>
      <Modal
        open={openBot}
        onClose={handleBotClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300, minHeight: 500, maxHeight: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Process</TableCell>
                  <TableCell align="right">Question</TableCell>
                  <TableCell align="right">Asked&nbsp;By</TableCell>
                  <TableCell align="right">Answer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? visitationNotes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : visitationNotes
                ).map((row) => (
                  <TableRow key={row.id}>
                  <TableCell style={{ width: 160, height: 30 }} id={row.id} component="th" scope="row" >
                    {}
                  </TableCell>
                    <TableCell style={{ width: 160, height: 30 }} id={row.id} component="th" scope="row" >
                      {row.process}
                    </TableCell>
                    <TableCell style={{ width: 160, height: 30 }} align="right">
                      {row.question}
                    </TableCell>
                    <TableCell style={{ width: 160, height: 42 }} align="right">
                      {row.asked_by}
                    </TableCell>
                    <TableCell style={{ width: 160, height: 42 }} align="right">
                      {row.answer}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 55 }}>
                    <TableCell>
                      <AddCircleIcon onClick={handleAddToBot} color="primary" />
                    </TableCell>
                    <TableCell>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="process"
                        value={process}
                        onChange={handleProcessChange}
                        label="Process"
                        sx={{width: 200}}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem  value={'Introduction'}>Introduction</MenuItem>
                        <MenuItem value={'Health History'}>Health History</MenuItem>
                        <MenuItem value={'Vital Sign Check'}>Vital Sign Check</MenuItem>
                        <MenuItem value={'Visual Exam'}>Visual Exam</MenuItem>
                        <MenuItem value={'Physical Exam'}>Physical Exam</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input id="question" value={question} onChange={handleChange} />
                    </TableCell>
                    <TableCell >
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={askedBy}
                        onChange={handleAskedBy}
                        label="Asked By"
                        sx = {{width: 200}}
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        <MenuItem value={'Dr. Egipto'}>Dr. Egipto</MenuItem>
                        <MenuItem value={'Henry Lu'}>Henry Lu</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input id="answer" value={answer} onChange={handleChange} />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={visitationNotes.length}
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
        </Box>
      </Modal>
      <Modal
        open={openScripts}
        onClose={handleScriptsClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={script_style} id="box">
          <Button id="generateButton" onClick={handleScriptGeneration} variant="contained">Generate Script</Button>
        </Box>
      </Modal>
    </div>
  );
}

PatientInformation.propTypes = {
  state: PropTypes.object
}