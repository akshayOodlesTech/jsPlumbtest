import React, { Component, useEffect, useRef } from 'react';
import './queueDetails.module.scss'
import '../../assets/css/style.scss';
import CustomInput from '../../components/custom-input';
import Images from '../../assets/asset_imports';
import {List,ListItem,ListItemIcon,ListItemText,AppBar, Tab, Tabs,Box,Checkbox,
makeStyles,Chip,Button,Table,TableBody,createMuiTheme,ThemeProvider,Typography,
TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Navbar from '../../components/Navbar';
import theme_colors from '../../utils/theme';
import NoContentTab from '../../components/NoContentTab';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NoContent = props => <div className="no-content">
<div className="text-center">
    <div className="form-group">
        <i className="fa fa-file-o" aria-hidden="true"></i>
    </div>
    <h6>No content to show</h6>
</div>
</div>

const FormTemplate = ({checked,id,title,subtitle,handleCheck}) =>  <div class="form-check form-group thsvg">
<Checkbox color="primary" checked={checked} onClick={handleCheck} inputProps={{ 'aria-labelledby': id }}/>
  <div>
<label>{title}</label>
<p>{subtitle}</p>
  </div>
</div>

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
        padding:'0 7px 0 7px !important',
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
  },
  appbarRoot:{
    padding: '0 15px',
    background:'transparent',
    boxShadow:'none',
  },
  indicator: {
    backgroundColor: theme_colors.secondary,
  },
  tabRoot:{
    width:'180px',
    // minHeight:'36px'
  },
}));

function createData(name,email,docs, users) {
  return { name, email, docs, users };
}

const rows = [
  createData('Received UK Invoices','akshay.singh2@oodlestechnologies.com', 3, 1),
  createData('Received US Invoices','akshay.singh2@oodlestechnologies.com', 1, 3),
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const CustomTab = ({title,icon,showChip,classes}) => <div className="custom-tab">
  <img src={icon}/>{title}
  {showChip && <Chip size="small" label="1" style={{marginLeft:'25px'}} classes={{root:classes.badgeRoot,label:classes.badgeLabel}}/>}
</div>

const QueueDetails = (props) =>  {
  var c = '';
  var ctx = '';
  const graphRef = useRef('GraphView');
  const [authToken, setAuthToken] =  React.useState('');
  const [isLoading, setLoading] =  React.useState(false);
  const [preview, setPreview] =  React.useState('');
  const [selected, setSelected] =  React.useState({})
  const [value, setValue] = React.useState(0);
  const [checkedElements, setCheckedElements] = React.useState(['0','2','5']);

  const classes = settingStyles();
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateChecklist = (item) => {
    let temp = null;
// console.warn("ssss",checkedElements.includes(item))
    if(checkedElements.includes(item)){
      temp = checkedElements.filter(val=> val!==item)
      setCheckedElements(temp);
    }else{
      temp = checkedElements;
      temp = temp.concat(item);
      console.warn("NEWASS---",temp)
      setCheckedElements(temp);
    }
  }

    return (
      <div className="main_container">
      <div className="col-md-2" style={{padding:'0'}}>
      <div className="form-group left-panel">
      <div className="form-group d-flex justify-content-center mt-4 banner-head">
       <div className="col-sm-9"> 
        <img src={Images.app_logo} style={{width:'100%'}} className="img-responsive" alt=""/>
        <div className="form-inline justify-content-center mt-2">
        <a>POWERED BY EXTRICATOR</a>
        </div>
      </div>
      </div>
      <div className="form-group form-inline ml-2">
          <div style={{width:'25px',marginRight:'15px'}}>
            <img src={Images.arrow_back} style={{width:'100%',height:'100%'}} alt="back"/>
          </div>Queue Details</div>
          <div id="option-list">
          <ThemeProvider theme={themeList}>
          <List component="nav" aria-label="main mailbox folders">
        <Link to="/queue_details" style={{textDecoration:'none'}}>  
        <ListItem button classes={{gutters:classes.noGutters}}>
            <img src={Images.users_icon}/>    
          <ListItemText classes={{primary:classes.listText}} primary="Assigned User" />
          <Chip size="small" label="1" classes={{root:classes.badgeRoot,label:classes.badgeLabel}} />
        </ListItem>
        </Link>
        <ListItem button classes={{gutters:classes.noGutters}}>
          <img src={Images.file_icon}/>
          <ListItemText classes={{primary:classes.listText}} primary="Document" />
          <Chip size="small" label="1" classes={{root:classes.badgeRoot,label:classes.badgeLabel}} />
        </ListItem>
        <ListItem button classes={{gutters:classes.noGutters}}>
          <img src={Images.checked_active}/>
          <ListItemText classes={{primary:classes.listText}} primary="Enabled fields to capture" />
          <Chip size="small" label="21" classes={{root:classes.badgeRoot,label:classes.badgeLabel}} />
        </ListItem>
        <ListItem button classes={{gutters:classes.noGutters}}>
        <img src={Images.focus_icon}/>
          <ListItemText classes={{primary:classes.listText}} primary="Fields to capture" />
          <Chip size="small" label="48" classes={{root:classes.badgeRoot,label:classes.badgeLabel}} />
        </ListItem>
      </List>
      </ThemeProvider>
      </div>
      </div>
      </div> 
      <div className = "right-panel col-md-10">
      <Navbar noPageTitle={true}/>
      <div className="container form-inline directory mt-3">
        <div style={{width:'30px'}}>
      <img src={Images.folder_icon} style={{width:'100%',marginRight:'10px'}}/>
      </div>
        &nbsp;&nbsp;&nbsp;&nbsp;Company Name/Received Invoices
      </div>
      <AppBar position="static" classes={{root:classes.appbarRoot}}>
      <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          fullWidth
          centered
          // style={{minHeight:'36px'}}
          classes={{
            indicator: classes.indicator
          }}
          aria-label="scrollable auto tabs example">

          <Tab classes={{root: classes.tabRoot}} label={<CustomTab classes={classes} icon={value===0?Images.input_user:Images.input_user} title="Access"/>} {...a11yProps(0)} />
          <Tab classes={{root: classes.tabRoot}} label={<CustomTab icon={value===1?Images.focus_icon:Images.focus_icon} title="Fields to capture"/>} {...a11yProps(1)} />
          <Tab classes={{root: classes.tabRoot}} label={<CustomTab icon={value===2?Images.gear_icon:Images.gear_icon} title="Settings"/>} {...a11yProps(2)} />
          <Tab classes={{root: classes.tabRoot}} label={<CustomTab icon={value===3?Images.chart_icon:Images.chart_icon} title="Extensions"/>} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      {value === 0 && <NoContent/>}
      {value === 1 && 
      <div id="fieldsCapture">
      
      <div className="container form-inline directory mt-3 ml-3 col-md-11" style={{justifyContent:'flex-start'}}>
        <div style={{width:'30px'}}>
      <img src={Images.info_icon} style={{width:'100%',marginRight:'10px'}}/>
      </div>
      <div className="col-md-9">
        The set of data fields captured in Extricator is customizable - Simply enable additional ones below as needed. We also recommend disabling fields that are not needed, as it speeds up the validation process.
      </div>
      </div>

      <div className="d-flex justify-content-center mt-5">
      <div className="col-md-5 card-leaf breadcrumb">
         <form>
  <div className="form-group">  
  <label>Basic Information</label>
  </div>
        <FormTemplate checked={checkedElements.includes('0')} id='0' 
        title="Invoice type" 
        handleCheck={()=>updateChecklist('0')}
        subtitle="Possible values: debit_note,credit_note,tax_invoice(most typical), proforma or other"/> 

        <FormTemplate checked={checkedElements.includes('1')} id='1' 
        title="Invoice Language" 
        handleCheck={()=>updateChecklist('1')}
        subtitle="The language which the document was written in. Possible values: ces, deu, eng, fra, slk or other."/> 

        <FormTemplate checked={checkedElements.includes('2')} id='2' 
        title="Invoice Number" 
        handleCheck={()=>updateChecklist('2')}
        subtitle="Invoice Number"/>

        <FormTemplate checked={checkedElements.includes('3')} id='3' 
        title="Customer ID" 
        handleCheck={()=>updateChecklist('3')}
        subtitle="The number by which the customer is registered in the system of the supplier."/>

      </form>
      </div>

      <div className="col-md-5 card-leaf breadcrumb ml-4">
        <form>
        <div className="form-group">  
        <label>Payment Instructions</label>
        </div>
        <FormTemplate checked={checkedElements.includes('4')} id='4' 
        title="Account Number" 
        handleCheck={()=>updateChecklist('4')}
        subtitle="Bank account number."/> 

        <FormTemplate checked={checkedElements.includes('5')} id='5' 
        title="Terms" 
        handleCheck={()=>updateChecklist('5')}
        subtitle="Payment terms as written on the document (eg. '45 days', 'upon receipt')."/> 

        <FormTemplate checked={checkedElements.includes('6')} id='6' 
        title="Payment State" 
        handleCheck={()=>updateChecklist('6')}
        subtitle="Particularly for consumer invoices with standing payment orders. Possible values: automatic, manual (most typical) or pending."/>

        <FormTemplate checked={checkedElements.includes('7')} id='7' 
        title="Payment Reference" 
        handleCheck={()=>updateChecklist('7')}
        subtitle="In some countries used by the supplier to match the payment received against the invoice."/>
      </form>
      </div>
       </div> 
       </div> 
       }
      {value === 2 && <NoContent/>}
      {value === 3 && <NoContent/>}
  </div>
  </div>
    );
  }
export default QueueDetails;

