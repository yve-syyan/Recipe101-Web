/* eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { getSingleRecipeIngredient } from "./getData";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
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
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  recipeID: PropTypes.string.isRequired
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}


const useStyles2 = makeStyles({
  table: {
    width: 650
    // minWidth: 200,
  },
  "& .MuiTableContainer-root": {
    width: "80px",
  },
  "& .MuiPaper-root": {
    width: "80px",
  }
});

// const rows = getSingleRecipeIngredient(props.recipeID);

export default function CustomPaginationActionsTable(props) {
  //   console.log(rows);
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  getSingleRecipeIngredient(props.recipeID).then((res) => setRows(res));

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} style={{ width: "650px", marginTop: "12px", marginLeft: "80px" }}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#9E4244" }}>
            <TableCell align="center" style={{ border: "2px solid white", color: "white", fontFamily: "Puata One", fontSize: "15px" }}>Ingredients</TableCell>
            <TableCell align="center" style={{ border: "2px solid white", color: "white", fontFamily: "Puata One", fontSize: "15px" }}>Quantity</TableCell>
            <TableCell align="center" style={{ border: "2px solid white", color: "white", fontFamily: "Puata One", fontSize: "15px" }}>Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.ingredient}>
              <TableCell style={{ border: "2px solid white", width: 250, backgroundColor: "#F0AB9F", color: "white", fontFamily: "Puata One", fontSize: "15px" }} component="th" scope="row" align="center">
                {row.ingredient}
              </TableCell>
              <TableCell style={{ border: "2px solid white", width: 200, backgroundColor: "#B6666F", color: "white", fontFamily: "Puata One", fontSize: "15px" }} align="center">
                {row.quantity}
              </TableCell>
              <TableCell style={{ border: "2px solid white", width: 200, backgroundColor: "#B6666F", color: "white", fontFamily: "Puata One", fontSize: "15px" }} align="center">
                {row.unit}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 43 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 8, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              style={{ backgroundColor: "#9E4244", color: "white", fontFamily: "Puata One" }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}