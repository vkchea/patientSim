import React, {useState} from 'react';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
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
import { useNavigate, useLocation } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import { Button } from '@mui/material';


function TablePaginationActions(props) {

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

export default function PatientList() {
  function createData(id, patientname, lastvisited, reasonofvisit) {
    return {id, patientname, lastvisited, reasonofvisit };
}

  const patientList = [
    createData("1", "Henry Lu", "11/25/2021", "Physical"),
    createData("2", "Derick Chauven", "10/12/2021", "Physical"),
    createData("3", "Garret Londer", "09/02/2021", "Injury"),
    createData("4", "Alyssa Mag", "09/01/2021", "Hair Loss"),
    createData("5", "Morris Fao", "08/20/2021", "Physical"),
    createData("6", "Gordon Ra", "08/19/2021", "Blood Draw")
  ]

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

  let navigation = useNavigate(); 
  let path;
  const routeChange = e =>{ 
      path = '../patientInformation'; 
      navigation(path, {state: e.target.id});
  }
  const handlePatientName = e => {
    routeChange(e);
  }

    return(
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
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
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
              <TableCell id={row.id} sx={{ cursor: 'pointer', "&:hover": {color: 'white'}}}  component="th" scope="row" onClick={handlePatientName} >
                {row.patientname}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.lastvisited}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
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
    );
  }

PatientList.propTypes = {
    patientId: PropTypes.string
}