/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Component, useEffect, useRef } from 'react';
import './settings.module.scss'
import '../../assets/css/style.scss';
import CustomInput from '../../components/custom-input';
import Images from '../../assets/asset_imports';
import {List,ListItem,ListItemIcon,ListItemText,
makeStyles,Chip,Button,Table,TableBody,createMuiTheme,ThemeProvider,
TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Navbar from '../../components/Navbar';
import theme_colors from '../../utils/theme';
import { Link } from 'react-router-dom';

const themeTable = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        "&:hover": {
          background: 'rgb(33,56,85)',
          background: 'linear-gradient(90deg, rgba(33,56,85,1) 29%, rgba(33,72,85,1) 57%, rgba(49,239,243,1) 100%)',
          borderRadius:'10px',
          }
      }
    },
    MuiTableCell: {
      root: {
        cursor:'pointer',
      }
    }
  }
});

const themeList = createMuiTheme({
  overrides: {
    MuiListItem: {
      
      root: {
        padding:'0 0 0 10px !important',
        "&:hover": {
          backgroundColor: `${theme_colors.secondary} !important`,
          }
      }
    },
    MuiTypography: {
      root: {
        height: '30px',
        alignItems: 'center',
        display: 'flex !important',
        "&:hover": {
          color: theme_colors.primary,
          }
      }
    }
  }
});

const settingStyles = makeStyles((theme) => ({
  listText: {
    color:'#fff',
    fontSize:'12px',
    fontWeight:'600'
  },
  noGutters:{
    paddingLeft:'0',
    paddingRight:'0'
  },
  badgeRoot:{
    background: theme_colors.secondary,
    width:'30px',
    height:'15px'
  },
  badgeLabel:{
    color:theme_colors.primary,
    fontSize:'10px',
    marginTop:'2px'
  },
  reviewBtn:{
    backgroundColor:theme_colors.primary,
    background: 'rgb(2,27,65)',
    background: 'linear-gradient(0deg, rgba(2,27,65,1) 49%, rgba(35,67,115,1) 100%)',
    borderRadius:'10px',
    padding:'10px 20px',
    marginLeft:'10px',
    '&:hover': {
      backgroundColor: theme_colors.primary,
      color: '#FFF'
  }},
  btnTitle:{
    textTransform:'none'
  },
  table: {
    minWidth: 650,
  },
  cellDivision:{
    borderBottom:'transparent',
    color:'#fff'
  }
}));

function createData(name,email,docs, users) {
  return { name, email, docs, users };
}

const rows = [
  createData('Received UK Invoices','akshay.singh2@oodlestechnologies.com', 3, 1),
  createData('Received US Invoices','akshay.singh2@oodlestechnologies.com', 1, 3),
];

const Settings = (props) =>  {
  var c = '';
  var ctx = '';
  const graphRef = useRef('GraphView');
  const [authToken, setAuthToken] =  React.useState('');
  const [isLoading, setLoading] =  React.useState(false);
  const [preview, setPreview] =  React.useState('');
  const [selected, setSelected] =  React.useState({})

  const classes = settingStyles();
    
    return (
      <div className="main_container">
      <div className="col-md-2" style={{padding:'0'}}>
      <div className="form-group left-panel">
      <div className="form-group d-flex justify-content-center mt-4 banner-head">
       <div className="col-sm-11"> 
        <img src={Images.app_logo} style={{width:'100%'}} className="img-responsive" alt=""/>
        <div className="form-inline justify-content-center mt-2">
        <a>POWERED BY EXTRICATOR</a>
        </div>
      </div>
      </div>
      <div className="form-group form-inline ml-2">
          <div style={{width:'25px',marginRight:'15px'}}>
            <img src={Images.arrow_back} style={{width:'100%',height:'100%'}} alt="back"/>
          </div>Settings</div>
          <div id="option-list">
          <ThemeProvider theme={themeList}>
          <List component="nav" aria-label="main mailbox folders">
        <Link to="/queue_details" style={{textDecoration:'none'}}>  
        <ListItem button classes={{gutters:classes.noGutters}}>
            {/* <img src={Images.users_icon}/> */}    
          <ListItemText classes={{primary:classes.listText}} primary="Queues" />
          {/* <Chip size="small" label="1" classes={{root:classes.badgeRoot,label:classes.badgeLabel}} /> */}
        </ListItem>
        </Link>
        <ListItem button classes={{gutters:classes.noGutters}}>
          {/* <img src={Images.file_icon}/> */}
          <ListItemText classes={{primary:classes.listText}} primary="Users" />
          {/* <Chip size="small" label="1" classes={{root:classes.badgeRoot,label:classes.badgeLabel}} /> */}
        </ListItem>
        <ListItem button classes={{gutters:classes.noGutters}}>
          {/* <img src={Images.checked_active}/> */}
          <ListItemText classes={{primary:classes.listText}} primary="Extensions" />
          {/* <Chip size="small" label="21" classes={{root:classes.badgeRoot,label:classes.badgeLabel}} /> */}
        </ListItem>
        <ListItem button classes={{gutters:classes.noGutters}}>
        {/* <img src={Images.focus_icon}/> */}
          <ListItemText classes={{primary:classes.listText}} primary="Integration Setup" />
          {/* <Chip size="small" label="48" classes={{root:classes.badgeRoot,label:classes.badgeLabel}} /> */}
        </ListItem>
      </List>
      </ThemeProvider>
      </div>
      </div>
      </div> 
      <div className = "right-panel col-md-10">
      <Navbar/>

      <form className="form-inline mt-2">
        <div className="col-md-4">Queues</div>
        <div className="form-group col-md-8 justify-content-end">
          <CustomInput icon={Images.input_glass} type="text" name="searchQueues" maxLength="50" placeholder="Search"/>
          <Button variant="contained" 
          classes={{root:classes.reviewBtn,label:classes.btnTitle}} 
          startIcon={<AddIcon/>}> Add Queue </Button>
          <Button variant="contained" 
          classes={{root:classes.reviewBtn,label:classes.btnTitle}} 
          startIcon={<AddIcon/>}> Add Workspace </Button>
          </div>
      </form>

      <div className="d-flex justify-content-center px-5 mt-4">
      <ThemeProvider theme={themeTable}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow hover key={row.name}>
              <TableCell classes={{root:classes.cellDivision}} component="th" scope="row">{row.name}</TableCell>
              <TableCell classes={{root:classes.cellDivision}} align="right">{row.email}</TableCell>
              <TableCell classes={{root:classes.cellDivision}} align="center">{row.docs} Documents</TableCell>
              <TableCell classes={{root:classes.cellDivision}} align="left">{row.users} Users</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </ThemeProvider>
    </div>
  </div>
  </div>
    );
  }
export default Settings;

