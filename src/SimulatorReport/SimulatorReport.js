import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
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
import { Box } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import './simulatorreport.css';
import { useNavigate, useLocation } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';

export default function Simulator() {

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
    function createEvaluationData(id, user, patient, date) {
        return { id, user, patient, date };
    };
    const evaluationList = [
        createEvaluationData("1", "Virath Chea", "Henry Lu", "04/24/2022")
    ]
    function createReportData(id, question, asked_by, answer, answered_by) {
        return { id, question, asked_by, answer, answered_by };
    };
    const reportInitial = [
        createReportData("1", "How is it going?", "Virath Chea", "Good.", "Henry Lu"),
        createReportData("2", "You are here for a physical, correct?", "Virath Chea", "Yes, I am here for a physical.", "Henry Lu"),
        createReportData("3", "Do you have any allergies?", "Virath Chea", "Yes. I am concerned about my allergies to some fruits like apples, cherries, and pears.", "Henry Lu"),
        createReportData("4", "What should I do?", "Henry Lu", "I will prescribe you some medicine.", "Virath Chea"),
        createReportData("5", "Are you on any new medication?", "Virath Chea", "I am not.", "Henry Lu"),
        createReportData("6", "1", "Health History", "6", "Have you had any surgeries done?", "Dr. Egipto", "I have not."),
        createReportData("7", "1", "Vital Sign Check", "7", "I am going to take your blood pressure reading now.", "Dr. Egipto", "Ok."),
        createReportData("8", "1", "Vital Sign Check", "8", "I am going to check your heart rate now.", "Dr. Egipto", "Ok."),
        createReportData("9", "1", "Vital Sign Check", "9", "I am going to check your respiratory rate.", "Dr. Egipto", "Ok."),
        createReportData("10", "1", "Visual Exam", "10", "I am going to take a look at your head.", "Dr. Egipto", "Ok."),
        createReportData("11", "1", "Visual Exam", "11", "I am going to take a look at your eyes.", "Dr. Egipto", "Ok."),
        createReportData("12", "1", "Visual Exam", "12", "I am going to take a look at your chest.", "Dr. Egipto", "Ok."),
        createReportData("13", "1", "Visual Exam", "13", "I am going to take a look at your abdomen.", "Dr. Egipto", "Ok."),
        createReportData("14", "1", "Physical Exam", "14", "I am going to listen to your heart.", "Dr. Egipto", "Ok."),
        createReportData("15", "1", "Physical Exam", "15", "I am going to listen to your lungs.", "Dr. Egipto", "Yes"),
    ]
    var reportList = [];

    const [selectedReport, setSelectedReport] = useState(0);

    const handleEvaluationList = () => {
        setSelectedReport(!selectedReport);
    }

    const [report, setReport] = useState([]);

    const handleShowReport = () => {
        setEvaluate(1);
        if (reportList.length === 0) {
            setReport(reportInitial);
        } else {
            reportList = report;
            setReport(reportList);
        }
    }

    const [evaluate, setEvaluate] = useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - evaluationList.length) : 0;

    var good = 0;
    const [goodMarks, setGoodMarks] = useState(0);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [rowIdMark, setRowIdMark] = useState([]);
    const handleChecks = (e) => {
        var idNotFound = true;
        var index;
        //if rowIdMark is empty then push initial object
        if (rowIdMark.length === 0) {
            var object = {
                id: e.target.id,
                state: true
            }
            good++
            setGoodMarks(good);
            rowIdMark.push(object);
            setRowIdMark(rowIdMark);
        } else {
            for (let i = 0; i < rowIdMark.length; i++) {
                //iterates through current list and checks if the current checkbox id is in there, 
                //and changes it's state.
                if (rowIdMark[i].id === e.target.id) {
                    index = i;
                    idNotFound = false;
                }
            }

            if (idNotFound === false) {
                rowIdMark[index].state = !rowIdMark[index].state
            } else {
                var object = {
                    id: e.target.id,
                    state: true
                }
                rowIdMark.push(object);
            }
            for (let i = 0; i < rowIdMark.length; i++) {
                if (rowIdMark[i].state === true) {
                    good++;
                }
            }
            setGoodMarks(good);
            setRowIdMark(rowIdMark);
        }
        console.log(rowIdMark);
        // console.log(object);
        // setRowIdMark(...rowIdMark, object)
        // console.log(e.target.id)
    }

    const [openEvaluation, setOpenEvaluation] = React.useState(false);
    const handleEvaluation = () => {
        setOpenEvaluation(true);
    }
    const handleEvaluationClose = () => setOpenEvaluation(false);
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
    const [response, setResponse] = useState('');
    const handleChange = e => {
        setResponse(e.target.value);
    };
    const [saveEvaluation, setSaveEvaluation] = useState(false);
    const handleConfirmEvaluation = () => {
        setOpenEvaluation(false);
        setSaveEvaluation(true);
    }
    const handleSaveEvaluationClose = () => setSaveEvaluation(false);
    return (
        <div>
            <Modal
                open={saveEvaluation}
                onClose={handleSaveEvaluationClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p>Saved Evaluation.</p>
                    <Button sx={{ marginTop: 28, marginLeft: 55 }} variant="contained" onClick={handleSaveEvaluationClose}>Close</Button>
                </Box> 
            </Modal>
            <Modal
                open={openEvaluation}
                onClose={handleEvaluationClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p>Final Grade Mark: {goodMarks}/{report.length}</p>
                    <TextField
                        id="outlined-multiline-static"
                        label="Remarks"
                        multiline
                        rows={4}
                        defaultValue=""
                        value={response}
                        onChange={handleChange}
                    />
                    <Button sx={{ marginTop: 3 }} variant="contained" onClick={handleConfirmEvaluation}>Confirm</Button>
                    <Button sx={{ marginTop: 3, marginLeft: 3 }} variant="contained" onClick={handleEvaluationClose}>Cancel</Button>
                </Box>
            </Modal>

            <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Simulator Reports
                        </Typography>
                        <Button id="logout" onClick={routeChange} color="inherit">Log Out</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <div class="simulator-report">
                <div>
                    <TableContainer sx={{ overflowY: 'scroll', minWidth: 200, height: 400, width: 500, marginRight: 2, marginBottom: 7 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Trainee</TableCell>
                                    <TableCell align="right">Patient</TableCell>
                                    <TableCell align="right">Date&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? evaluationList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : evaluationList
                                ).map((row) => (
                                    <TableRow key={row.id} sx={{ "&:hover": { backgroundColor: '#2979ff' } }}>
                                        <TableCell sx={{ cursor: 'pointer', "&:hover": { color: 'white' } }} id={row.id} component="th" scope="row" onClick={handleEvaluationList} >
                                            {row.user}
                                        </TableCell>
                                        <TableCell style={{ width: 100 }} align="right">
                                            {row.patient}
                                        </TableCell>
                                        <TableCell style={{ width: 100 }} align="right">
                                            {row.date}
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
                                        count={evaluationList.length}
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
                    {selectedReport ?
                        <Button variant="contained" onClick={handleShowReport}>Show Report</Button> :
                        <div></div>
                    }
                </div>
                {evaluate ? <div>
                    <TableContainer sx={{ minWidth: 200, maxWidth: 500, height: 400, width: 500, overflowY: 'scroll', marginBottom: 3 }} >
                        <Table aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Question</TableCell>
                                    <TableCell align="right">Asked By</TableCell>
                                    <TableCell align="right">Answer&nbsp;</TableCell>
                                    <TableCell align="right">Answered By&nbsp;</TableCell>
                                    <TableCell align="right">Grade Mark&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? report.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : report
                                ).map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell id={row.id} component="th" scope="row" onClick={handleEvaluationList} >
                                            {row.question}
                                        </TableCell>
                                        <TableCell style={{ width: 100 }} align="right">
                                            {row.asked_by}
                                        </TableCell>
                                        <TableCell style={{ width: 100 }} align="right">
                                            {row.answer}
                                        </TableCell>
                                        <TableCell style={{ width: 100 }} align="right">
                                            {row.answered_by}
                                        </TableCell>
                                        <TableCell style={{ width: 100 }} align="right">
                                            <Checkbox id={row.id} onClick={handleChecks} {...label} size="small" />
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
                                        colSpan={5}
                                        count={report.length}
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
                    <div class="grading">
                        <p>Grade: {goodMarks}/{report.length}</p>
                        <Button variant="contained" onClick={handleEvaluation}>Evaluate</Button>
                    </div>
                </div> : <div></div>}
            </div>
        </div>
    );
}