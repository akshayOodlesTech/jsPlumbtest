import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import '../views/Dashboard/dashboard.module.scss'
import { lighten, makeStyles,createMuiTheme,ThemeProvider} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FilterListIcon from '@material-ui/icons/FilterList';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import theme_colors from '../utils/theme';
import { BASE_URL } from '../utils/constants';
import { fetchAuthToken } from '../utils/Helpers';
import NoContentTab from '../components/NoContentTab';
import axios from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageShowcase from './ImageShowcase';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import Images from '../assets/asset_imports';

function createData(doc_name, received_at, modified_at, modified_by,doc_id) {
  return { doc_name, received_at, modified_at, modified_by,doc_id };
}

const statData = [];
// const statData= [
//   {
//     "id": 1,
//     "file_name": "docs/Akshay Singh_2020-09-14 14:37:03.041348.pdf",
//     "user_email": "akshay.singh2@oodlestechnologies.com",
//     "modified_at": "2020-09-14T14:37:05.330000Z",
//     "created_at": "2020-09-14T14:37:05.330000Z"
//   },
//   {
//     "id": 2,
//     "file_name": "docs/Akshay Singh_2020-09-14 14:37:03.041348.pdf",
//     "user_email": "akshay.singh2@oodlestechnologies.com",
//     "modified_at": "2020-09-14T14:37:05.694000Z",
//     "created_at": "2020-09-14T14:37:05.694000Z"
//   },
//   {
//     "id": 3,
//     "file_name": "docs/Wellsite-Ai-29_05_2020-13_36_01_2020-09-14 19:21:16.908519.pdf",
//     "user_email": "akshay.singh2@oodlestechnologies.com",
//     "modified_at": "2020-09-14T19:21:17.709000Z",
//     "created_at": "2020-09-14T19:21:17.709000Z"
//   },
//   {
//     "id": 4,
//     "file_name": "docs/Wellsite-Ai-29_05_2020-13_36_01_2020-09-14 19:21:16.908519.pdf",
//     "user_email": "akshay.singh2@oodlestechnologies.com",
//     "modified_at": "2020-09-14T19:21:17.980000Z",
//     "created_at": "2020-09-14T19:21:17.980000Z"
//   },
//   {
//     "id": 5,
//     "file_name": "docs/Wellsite-Ai-29_05_2020-13_36_01_2020-09-14 19:21:16.908519.pdf",
//     "user_email": "akshay.singh2@oodlestechnologies.com",
//     "modified_at": "2020-09-14T19:21:18.181000Z",
//     "created_at": "2020-09-14T19:21:18.181000Z"
//   },
//   {
//     "id": 6,
//     "file_name": "docs/Wellsite-Ai-29_05_2020-13_36_01_2020-09-14 19:21:16.908519.pdf",
//     "user_email": "akshay.singh2@oodlestechnologies.com",
//     "modified_at": "2020-09-14T19:21:18.326000Z",
//     "created_at": "2020-09-14T19:21:18.326000Z"
//   },
//   {
//     "id": 7,
//     "file_name": "docs/Ansh_2020-09-14 19:21:38.921478.pdf",
//     "user_email": "akshay.singh2@oodlestechnologies.com",
//     "modified_at": "2020-09-14T19:21:39.497000Z",
//     "created_at": "2020-09-14T19:21:39.497000Z"
//   }
// ]
const checkBoxStyles = theme => ({
    root: {
      '&$checked': {
        color: '#3D70B2',
      },
    },
    checked: {},
   })

const themeTable = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        "&:last-child": {
          // "&:hover": {
          //   backgroundColor: theme_colors.tertiary,
          //   display:'flex',
          //   justifyContent:'flex-end',
          //   alignItems:'center'
          // },
        }
      }
    }
  }
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'doc_name', numeric: false, disablePadding: true, label: 'Document names' },
  { id: 'received_at', numeric: true, disablePadding: false, label: 'Received at' },
  { id: 'modified_at', numeric: true, disablePadding: false, label: 'Modified at' },
  { id: 'modified_by', numeric: true, disablePadding: false, label: 'Modified by' },

];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>

      <TableRow className="thsvg">
        <TableCell classes={{root:classes.tableCell}} padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
          <Tooltip title="Filter list">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> 
        </Tooltip>
        </TableCell>
        <TableCell classes={{root:classes.toolbarHead}} padding="checkbox">
          {props.children}
        </TableCell>
        </TableRow>
        
      <TableRow>
        <TableCell classes={{root:classes.tableCell}} padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
          <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        </TableCell>
        {headCells.map((headCell,index) => (
          <TableCell
            classes={{root:classes.tableHead}}
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}>

            <TableSortLabel
            IconComponent={ExpandMoreIcon}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    minHeight:'40px'
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          // backgroundColor: theme_colors.tertiary,
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: 'red',
        },
  title: {
    flex: '1 1 100%',
    color:'#fff'
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {(
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      )}
        
      {numSelected > 0 ? (
        <div className="col-md-6 d-flex justify-content-between">
        <Tooltip title="Review">
        <img src={Images.glasses_active} style={{width:'20px',height:'20px'}}/>
      </Tooltip>
      <Tooltip title="Review">
      <img src={Images.time_active} style={{width:'20px',height:'20px'}}/>
      </Tooltip>
      <Tooltip title="Export">
      <img src={Images.folder_icon} style={{width:'20px',height:'20px'}}/>
      </Tooltip>
      <Tooltip title="Delete">
      <img src={Images.trash_active} style={{width:'20px',height:'20px'}}/>
      </Tooltip>
        
      </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    backgroundColor:'transparent',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    color:'#fff'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableCell:{
    color:'#fff',
    borderBottom: "none",
    position:'relative'
  },
  checkRoot: {
    "&$checked": {
      color: "gold"
    }
  },
  checkedBox: {},
  toolbarHead:{
    width:'100%',
    color:'#fff',
    borderBottom: "none",
    position:'relative'
  },
  tableHead:{
    color: theme_colors.secondary,
    borderBottom: "none",
    position:'relative'
  },
  docCell:{
    color:'#fff',
    width:'400px'
  },
  textContainer : {
    display: 'block',
    width: '150px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontSize: '12px',
    textOverflow: 'ellipsis'
  },
  downloadContainer : {
    height:'45px',
    bottom:'5px',
    // position:'absolute',
    display: 'flex',
    justifyContent:'flex-end',
    alignItems:'center',
    // backgroundColor:theme_colors.tertiary,
    background: 'rgb(6,34,65)',
    background: 'linear-gradient(90deg, rgba(6,34,65,1) 28%, rgba(49,239,243,1) 100%)',
    width: '150px',
    padding: '0 15px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontSize: '12px',
    textOverflow: 'ellipsis'
  },
  paginationSelect:{
    backgroundColor:'#000',
    '&:hover': {
      backgroundColor:'#000',
    },
    '&:selected': {
      backgroundColor:'#000',
    }
  }
}));

 function InvoiceTable(props) {

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('received_at');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setLoading] =  React.useState(false);
  const [authToken, setAuthToken] =  React.useState('');
  const [fileId, setFileId] =  React.useState(null);
  const [modifierId, setModifierId] =  React.useState('');
  
  const fetchAllDocs = () => {
    let tempRows = [];
        setLoading(!isLoading);
        axios({ method: 'get',url:`${process.env.REACT_APP_BASE_URL}/doc_details/`,headers: {'Authorization': `Bearer ${authToken}`}})
        .then(res => {
          console.log("DOCRESP::"+JSON.stringify(res));
          res.data.map(item => {
            tempRows.push(createData(item.file_name.split("/")[1], item.created_at, item.modified_at,item.user_email,item.id))
          })
          console.log("temmssss",rows)
          // rows = tempRow;
          setRows(tempRows);
          setLoading(!isLoading);
        })
        .catch(error => {
          if (error.response) {
          console.error("DOCERR::",error.response);
          // this.setState({errorMsg:error.response.data.non_field_errors[0]});
          }
          setLoading(!isLoading);
        })
      }

        useEffect(() => {
          var auth = fetchAuthToken();
          setAuthToken(auth);
          // if(authToken){
          //   fetchAllDocs();
          // }
        },[])
        
        useEffect(() => {
          console.warn("****file uploaded****")
          fetchAllDocs();
        },[authToken,props.shouldUpdate])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.doc_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const showFileImage = (data) => setFileId(data)

  return (
    <div className={classes.root}>
      {
        fileId &&
        <ImageShowcase fileId={fileId} handleClose={()=>setFileId(null)}/>
      }
      
      <Paper className={classes.paper}>
        {/* {
          selected.length>0 && <EnhancedTableToolbar numSelected={selected.length} />
        } */}
        
        {
        rows.length > 0 ?
        <>
            <ThemeProvider theme={themeTable}>
        <TableContainer style={{maxHeight:'200px'}}>
          <Table
            className ={classes.table}
            aria-labelledby ="tableTitle"
            aria-label ="enhanced table">

            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}>
                {selected.length>0 && <EnhancedTableToolbar numSelected={selected.length} />}
              </EnhancedTableHead>  

            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.doc_name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      className="thsvg"
                      hover
                      onClick={(event) => handleClick(event, row.doc_name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.doc_name+index}
                      selected={isItemSelected}
                    >
                      <TableCell  classes={{root:classes.tableCell}} padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell classes={{root:classes.tableCell}} component="th" id={labelId} scope="row" padding="none">
                      <Link to={`/document_details/${row.doc_id}`}>
                      <div className={classes.textContainer} onMouseEnter={()=>showFileImage(row.doc_id)} onMouseLeave={()=>showFileImage('')}>
                        {row.doc_name}
                      </div>
                      </Link>
                      </TableCell>
                      <TableCell classes={{root:classes.tableCell}} align="left"><div className={classes.textContainer}>{row.received_at}</div></TableCell>
                      <TableCell classes={{root:classes.tableCell}} align="left"><div className={classes.textContainer}>{row.modified_at}</div></TableCell>
                      <TableCell classes={{root:classes.tableCell}} align="left">
                        <div 
                        className={index===modifierId?classes.downloadContainer:classes.textContainer} 
                        // className={classes.textContainer} 
                        
                        onMouseEnter={()=>setModifierId(index)} 
                        onMouseLeave={()=>setModifierId(null)}
                        > 
                          {index==modifierId?
                          <a href={`${process.env.REACT_APP_BASE_URL}/download_file/?id=${row.doc_id}`} download="download_file">
                            <i className="fa fa-cloud-download" aria-hidden="true"></i>
                          </a>
                          :row.modified_by} 
                          {/* {row.modified_by} */}
                          </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        </ThemeProvider>
        <TablePagination
        classes={{menuItem:classes.paginationSelect}}
        rowsPerPageOptions={[3,5,10,25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}/>
      </>:<NoContentTab/>
          }
      </Paper>
    </div>
  );
}


export default withRouter(InvoiceTable);
