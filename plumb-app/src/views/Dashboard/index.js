/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from "react";
import "./dashboard.module.scss";
import "../../assets/css/style.scss";
import PasswordFeild from "../../components/password-feild";
import { Link } from "react-router-dom";
import Images from "../../assets/asset_imports";
import {
  Chip,
  Avatar,
  Tab,
  Tabs,
  Box,
  Button,
  CircularProgress,
  Backdrop,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import theme_colors from "../../utils/theme";
import PropTypes from "prop-types";
import InvoiceTable from "../../components/TableComponent";
import NoContentTab from "../../components/NoContentTab";
import $ from "jquery";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { fetchAuthToken } from "../../utils/Helpers";
import SnackbarComponent from "../../components/SnackbarComponent";
import Navbar from "../../components/Navbar";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from '@material-ui/lab';
import Menu from "@material-ui/core/Menu";
import Select from "@material-ui/core/Select";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

const accordionTheme = createMuiTheme({
  overrides: {
    MuiAccordionSummary: {
      expandIcon: {
        "&$expanded": {
          transform: "rotate(90deg)",
        },
      },
    },
  },
});

const percentage = 66;
const sortOptions = [
  {
    value: "Sort by",
  },
  {
    value: "Last Month",
  },
  {
    value: "Last week",
  },
  {
    value: "Last year",
  },
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
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const documents_data = [
  { total_docs: 0, status: "uploaded", count: 3 },
  { total_docs: 0, status: "confirmed", count: 3 },
];
const accordionStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    width: "100%",
    background: "transparent",
    boxShadow: "none",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#fff",
  },
  content: {
    color: "#062241",
    background: "rgba(255,255,255,0.1)",
    fontWeight: "600",
    padding: "6px",
    // justifyContent:'space-between',
    alignItems: "center",
    cursor: "pointer",
    justifyContent: "space-between",
    paddingLeft: "40px",
  },
  contentList: {
    backgroundColor: "transparent",
    fontSize: "12px",
  },
  arrowIcon: {
    padding: "0",
  },
  badgeRoot: {
    background: theme_colors.secondary,
    width: "33px",
    height: "17px",
    color: theme_colors.primary,
  },
  badgeLabel: {
    color: theme_colors.primary,
  },
  poweredBy: {
    borderRight: "1px solid #c7c7c7",
  },
  emailChip: {
    background: "rgba(255,255,255,0.1)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.2)",
      color: "#FFF",
    },
  },
  emailLogo: {
    background: theme_colors.secondary,
    color: `${theme_colors.primary} !important`,
  },
  appbarRoot: {
    padding: "0 15px",
    background: "transparent",
    boxShadow: "none",
  },
  indicator: {
    backgroundColor: theme_colors.secondary,
  },
  tabRoot: {
    width: "180px",
  },
  importBtn: {
    backgroundColor: "#00f0cb",
    // background: 'rgb(2,27,65)',
    // background: 'linear-gradient(0deg, rgba(2,27,65,1) 49%, rgba(35,67,115,1) 100%)',
    borderRadius: "6px",
    "&:hover": {
      backgroundColor: theme_colors.primary,
      color: "#FFF",
    },
  },

  logOutBtn: {
    backgroundColor: theme_colors.primary,
    color: "#FFF",
    // background: 'rgb(2,27,65)',
    // background: 'linear-gradient(0deg, rgba(2,27,65,1) 49%, rgba(35,67,115,1) 100%)',
    borderRadius: "2px",
    "&:hover": {
      backgroundColor: theme_colors.primary,
      color: "#FFF",
    },
  },

  reviewBtn: {
    backgroundColor: theme_colors.primary,
    background: "rgb(2,27,65)",
    background:
      "linear-gradient(0deg, rgba(2,27,65,1) 49%, rgba(35,67,115,1) 100%)",
    borderRadius: "10px",
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: theme_colors.primary,
      color: "#FFF",
    },
  },
  backdrop: {
    zIndex: 10,
    color: "#fff",
  },
}));

const accoSummaryStyles = makeStyles((theme) => ({
  root: {
    minHeight: "26px",
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 0,
    boxShadow: "none",
  },
  content: {
    margin: "0",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const moreIconStyles = makeStyles((theme) => ({
  root: {
    padding: "0",
  },
}));

const invoice_types = [
  {
    title: "EU Invoices",
    text: "VAT invoices with EU-style bank information.",
  },
  {
    title: "UK Invoices",
    text: "Also best for India, Canada and Australia.",
  },
  {
    title: "US Invoices",
    text: "Tax invoices in the US and internationally.",
  },
];

// const CustomTab = ({iconClass,title}) => <div className="custom-tab"><i className={`fa ${iconClass} mr-2`} aria-hidden="true"></i>{title}</div>
const CustomTab = ({ title, icon, showChip, classes }) => (
  <div className="custom-tab review-div">
    <img src={icon} />
    {title}
    {showChip && (
      <Chip
        size="small"
        label="1"
        style={{ marginLeft: "25px" }}
        classes={{ root: classes.badgeRoot, label: classes.badgeLabel }}
      />
    )}
  </div>
);

const Dashboard = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = React.useState(0);
  const [paginMenu, setPaginMenu] = React.useState(false);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [profileMenuShow, setProfileMenuShow] = React.useState(false);
  const [authToken, setAuthToken] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [updateTable, setUpdateTable] = React.useState(false);
  const [sortOption, setSortOption] = React.useState("Sort by");
  const [page, setPage] = React.useState(1);
  const [calander, openCalander] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [vendor,setVendor] = React.useState([]);
  const [vendorDetails,setVendorDetails] = React.useState([]);
  const [amount, setAmount] = React.useState(0);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const classes = accordionStyles();
  const summaryClass = accoSummaryStyles();

  useEffect(() => {
    var auth = fetchAuthToken();
    setAuthToken(auth);
    getVendor();
    getAmount();
    // $('.map').maphilight();
    // const lls = process.env;
    console.warn("jjaa", process.env.REACT_APP_BASE_URL);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const togglePaginationMenu = async () => {
    await setPaginMenu(!paginMenu);
    if (paginMenu) {
      $(".dropdown-menu").addClass("show");
    } else {
      $(".dropdown-menu").removeClass("show");
    }
  };

  const getPerPageItems = (item) => {
    console.log("hhh", item);
    setItemsPerPage(item);
    $(".dropdown-menu").removeClass("show");
  };

  const profileAction = () => {
    setProfileMenuShow(!profileMenuShow);
  };

  const closeProfileMenu = () => {
    if (profileMenuShow || $(".dropdown-menu").hasClass("show")) {
      setProfileMenuShow(false);
      $(".dropdown-menu").removeClass("show");
    }
  };

  const handleLogout = async () => {
    await localStorage.removeItem("auth_token");
    props.history.replace({ pathname: "/Login" });
  };

  function openNav() {
    document.getElementById("myNav").style.height = "100%";
  }

  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }

  var time = null;
  clearTimeout(time);
  if (successMsg) {
    time = setTimeout(() => setSuccessMsg(""), 4000);
  }

  const addInvoice = (event) => {
    setOpen(!open);
    let fileData = null;
    if (event.target.files.length) {
      fileData = event.target.files[0];

      const formData = new FormData();
      formData.append("file", fileData);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/file_upload/`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(function (response) {
          //handle success
          console.warn("FERERE", response);
          setOpen(false);
          setSuccessMsg(response.data.message);
          setUpdateTable(!updateTable);
        })
        .catch(function (error) {
          //handle error
          setOpen(false);
        });
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const onCalandarClick = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
    openCalander(true);
  };

  const handleCalandarClose = () => {
    setAnchorEl(null);
  };

  const getVendor = () => {
    let  authToken = fetchAuthToken();
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/vendor_details/`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(function (response) {
        //handle success
        console.log("vendor", response);
        setVendor(response.data)
      })
      .catch(function (error) {
        //handle error

      });
  }

  const getAmount = () => {
    let  authToken = fetchAuthToken();

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/get_amount/`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(function (response) {
        //handle success
        console.log("amount", response.data.total_amount);
        setAmount(response.data.total_amount)
      })
      .catch(function (error) {
        //handle error

      });
  }

  const getVendorDetails = (id)=>{
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/vendor_file_details/?id=${id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(function (response) {
        //handle success
        console.log("vendorDetails", response);
        setVendorDetails(response.data)
      })
      .catch(function (error) {
        //handle error

      });
  }

  const createDateStr = (data)=>{
    const date = new Date(data).toString();
    return date
  }

  return (
    <>
      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="dashboard_container">
        <SnackbarComponent message={successMsg} open={successMsg} />
        <div
          className="menu-side"
          style={{ backgroundImage: Images.data_center }}
        >
          <div className="image-full">
            <div className="form-group d-flex justify-content-center mt-4 banner-head">
              <div className="col-sm-9">
                <img
                  src={Images.app_logo}
                  style={{ width: "100%" }}
                  className="img-responsive"
                  alt=""
                />
                {/*  <div className="form-inline justify-content-center mt-2">
        <a>POWERED BY EXTRICATOR</a>
        </div> */}
              </div>
            </div>
          </div>

          {/*   <nav className="navbar justify-content-between left-nav gradient-block mx-3">
          <a className="navbar-brand">Documents</a>
          <form className="form-inline">
            <a href="/settings"><i className="fa fa-cog" style={{fontSize:'18px'}} aria-hidden="true"></i></a>
            <i className="fa fa-signal ml-2" aria-hidden="true"></i>
          </form>
        </nav>  */}
          {/*    <ThemeProvider theme={accordionTheme}> 
      <Accordion className={classes.root}>
        <AccordionSummary
        classes={{root:summaryClass.root,content:summaryClass.content}}
          expandIcon={<ArrowRightIcon style={{ fill: theme_colors.secondary }} classes={{root:classes.arrowIcon}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography className={classes.heading}>Your Company</Typography>
          <Chip size="small" label="1" style={{marginRight:'5px'}} classes={{root:classes.badgeRoot,label:classes.badgeLabel}}/>
        </AccordionSummary>
        <AccordionDetails classes={{root:classes.content}}>
          <Typography className={classes.contentList}>Received UK Invoices</Typography>
          <Chip size="small" label="1" classes={{root:classes.badgeRoot,label:classes.badgeLabel}} />
        </AccordionDetails>
      </Accordion>
      </ThemeProvider> */}

          <AppBar position="static" classes={{ root: classes.appbarRoot }}>
            <Tabs
              value={value}
              orientation="vertical"
              onChange={handleChange}
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              fullWidth
              centered
              classes={{
                indicator: classes.indicator,
              }}
              aria-label="scrollable auto tabs example"
            >
              <Tab
                classes={{ root: classes.tabRoot }}
                label={
                  <CustomTab
                    classes={classes}
                    icon={value === 0 ? Images.glasses_active : Images.glasses}
                    showChip={true}
                    title="To Review"
                  />
                }
                {...a11yProps(0)}
              />
              <Tab
                classes={{ root: classes.tabRoot }}
                label={
                  <CustomTab
                    icon={value === 2 ? Images.trash_active : Images.checked}
                    title="Parsed"
                  />
                }
                {...a11yProps(2)}
              />
              <Tab
                classes={{ root: classes.tabRoot }}
                label={
                  <CustomTab
                    icon={value === 4 ? Images.trash_active : Images.trash}
                    title="Deleted"
                  />
                }
                {...a11yProps(4)}
              />
            </Tabs>
          </AppBar>

          {/*    
      <div className="doc-stats invite-bar gradient-block mt-4">
       <div className="form-group px-3"> 
        <h5 className="mt-2">Upload and confirm at least 3 of your own documents.</h5>
      </div>
          {
            documents_data.map(item => 
            <div className="form-inline justify-content-start mt-2 ml-2">
              <div className="d-flex justify-content-start">
            <div className="score-balloon tablet-gradient">
              {item.total_docs}/{item.count}
            </div>
            </div>
            <div className="d-flex justify-content-start">
            <label style={{letterSpacing:'0.5px'}} className="ml-2">Documents {item.status}</label>
            </div>  
          </div>
          )}
      </div> */}

          <div className="mt-4 bottom-div">
            {/* <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          10,
        )}%`}</Typography>
      </Box>
    </Box> */}

            {/* <ProgressBar 
    progress={50}
    size={500}
    strokeWidth={15}
    circleOneStroke='#7ea9e1'
    circleTwoStroke='#7ea9e1'
/> */}

            {/* <CircularProgressbar value={percentage} text={`${percentage}%`} />;
             */}
          </div>

          {/* <div className="text-center doc-stats invite-bar mt-2">
      <i className="fa fa-user-plus mr-2" aria-hidden="true"></i>
       Invite a colleague
      </div> */}
        </div>

        {/*- - - - - - - - - - - - - - -  R H S  - - - - - - - - - - - - - - - */}

        <div className="invoice-side pt-2" onClick={closeProfileMenu}>
          {/*  <Navbar>
            <a id="invoice-table" className="navbar-brand"><label>company_name</label> / Received invoices</a>
          </Navbar> */}

          <div class="col-md-12 basic-search mt-3">
            <div class="input-field">
              <input id="search" type="text" placeholder="Search" />
              <div class="icon-wrap">
                <img src={Images.search_icon} style={{ width: "20px" }} />
              </div>
              <img
                src={Images.calendar}
                className="calendar"
                onClick={onCalandarClick}
              />
              {calander&&<div >
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                // open={calander}
                className="mt-5"
                onClose={handleCalandarClose}
              >
                <MenuItem
                  onClick={handleCalandarClose}
                  style={{ backgroundColor: "#062241" }}
                  
                >
                  <div >
                  <div style={{ display: "flex", minWidth: 100 }}>
                    From :
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      // value={age}
                      // onChange={handleChange}
                      className="to-day"
                      label="Age"
                      style={{ display: "flex", minWidth: 60,color:'#FFF',marginLeft:5,  }}
                    >
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={1}>1</MenuItem>
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={2}>2</MenuItem>
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={3}>3</MenuItem>
                    </Select>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      className="to-day"
                      // value={age}
                      // onChange={handleChange}
                      label="Age"
                      style={{ display: "flex", minWidth: 70,color:'#FFF',marginLeft:25 }}
                    >
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={1}>Jan</MenuItem>
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={2}>Feb</MenuItem>
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={3}>Mar</MenuItem>
                    </Select>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      className="to-day"
                      // value={age}
                      // onChange={handleChange}
                      label="Age"
                      style={{ display: "flex", minWidth: 80,color:'#FFF',marginLeft:22 }}
                    >
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={1}>2017</MenuItem>
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={2}>2018</MenuItem>
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={3}>2019</MenuItem>
                    </Select>
                  </div>
                  
                  <div style={{ display: "flex", minWidth: 100 }} className="mt-1">
                    To :
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      // value={age}
                      // onChange={handleChange}
                      className="to-day"
                      label="Age"
                      style={{ display: "flex", minWidth: 60,color:'#FFF',marginLeft:"25px" }}
                    >
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={1}>1</MenuItem>
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={2}>2</MenuItem>
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={3}>3</MenuItem>
                    </Select>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      className="to-day"
                      // value={age}
                      // onChange={handleChange}
                      label="Age"
                      style={{ display: "flex", minWidth: 70,color:'#FFF',marginLeft:25 }}
                    >
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={1}>Jan</MenuItem>
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={2}>Feb</MenuItem>
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={3}>Mar</MenuItem>
                    </Select>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      className="to-day"
                      // value={age}
                      // onChange={handleChange}
                      label="Age"
                      style={{ display: "flex", minWidth: 80,color:'#FFF',marginLeft:22 }}
                    >
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={1}>2017</MenuItem>
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={2}>2018</MenuItem>
                      <MenuItem style={{color:'#FFF',backgroundColor:'#062241'}} value={3}>2019</MenuItem>
                    </Select>
                  </div>
                  </div>
                </MenuItem>
                <MenuItem
                  onClick={handleCalandarClose}
                  style={{ backgroundColor: "#062241" }}
                >
                  <Button
                component="span"
                variant="contained"
                classes={{ root: classes.logOutBtn }}
                style={{ height: 30, borderRadius: 2,marginLeft:'70%',backgroundColor:'#00f0cb' }}
              >
                <span
                  style={{
                    color: "#000",
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  Search
                </span>
              </Button>
                </MenuItem>
              </Menu>
                </div>}
              <TextField
                id="standard-select-sort"
                select
                // variant="outlined"
                value={sortOption}
                // fullWidth
                size="small"
                style={{
                  marginLeft: 50,
                  minWidth: 115,
                  height: 35,
                  marginTop: 8,
                  marginBottom: 10,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid lightGray",
                  borderRadius: 5,
                  padding: "0 0",
                  paddingLeft: "20px",
                  paddingTop: "5px",
                  fontSize: "12px"
                }}
                onChange={handleSortChange}

               className="fontAtt"
              // SelectProps={{
              //   native: true,
              // }}
              >
                {sortOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    style={{ backgroundColor: "#062241", paddingLeft: 10 }}>
                    <p style={{ color: "#FFF" }}>{option.value}</p>
                  </MenuItem>
                ))}
              </TextField>

              <i class="fa fa-cog ml-4"></i>

              <Chip
                className="ml-4 chipDiv"
                clickable={true}
                classes={{ root: classes.emailChip }}
                onClick={()=>props.history.push('/account')}
                avatar={
                  <Avatar classes={{ root: classes.emailLogo }}>U</Avatar>
                }
                label="shiv.shah@oodlestechnologies.com"
              />
            </div>
            <div className="logout-btn mr-2">
              <Button
                component="span"
                variant="contained"
                classes={{ root: classes.logOutBtn }}
                style={{ height: 30, borderRadius: 2 }}
              >
                <span
                  style={{
                    color: "#f8f9fa",
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  Logout
                </span>
              </Button>
            </div>
          </div>

          {/* <nav className="navbar justify-content-between right-header">
          <a id="invoice-table" className="navbar-brand"><label>company_name</label> / Received invoices</a>
          <form className="form-inline control-section">
            <div className="icon-badge mx-2">
            <img src={Images.matrix_icon} style={{width:'100%'}} className="img-responsive" alt=""/>
           </div>
            <Chip onClick={()=>profileAction()} classes={{root:classes.emailChip}} avatar={<Avatar classes={{root:classes.emailLogo}}>U</Avatar>} label="user_name@organization_name.com"/>
          </form>
        </nav>
        { 
        profileMenuShow &&
        <div className="profile-menu show">
          <a className="dropdown-item" href="#">My Account</a>
          <a className="dropdown-item" href="#" onClick={handleLogout}>Sign Out</a>
        </div>
        } */}

          {/* 
          <div class="col-md-8 basic-search mt-3">
            <div class="input-field">
              <input id="search" type="text" placeholder="Search" />
              <div class="icon-wrap">
                <img src={Images.search_icon} style={{ width: '20px' }} />
              </div>
              <img src={Images.calendar} className="calendar" onClick={onCalandarClick} />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCalandarClose}
              >
                <MenuItem onClick={handleCalandarClose} style={{ backgroundColor: '#062241' }}>
                  <div style={{ display: 'flex',minWidth:200 }}>
                    To :
                        <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      // value={age}
                      // onChange={handleChange}
                      label="Age"
                      style={{ display: 'flex',minWidth:200 }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>01</MenuItem>
                      <MenuItem value={20}>02</MenuItem>
                      <MenuItem value={30}>03</MenuItem>
                    </Select>
                  </div>
                </MenuItem>

              </Menu>
              <TextField
                id="standard-select-sort"
                select
                // variant="outlined"
                value={sortOption}
                // fullWidth
                size="small"
                style={{ marginLeft: 50, minWidth: 115, height: 35, marginTop: 8, marginBottom: 10, backgroundColor: '#062241' }}
                onChange={handleSortChange}
              // SelectProps={{
              //   native: true,
              // }}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value} style={{ backgroundColor: '#062241', paddingLeft: 10 }}>
                    <p style={{ color: '#FFF' }}>{option.value}</p>
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div> */}

          {/*     <AppBar position="static" classes={{root:classes.appbarRoot}}>
        
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          fullWidth
          centered
          classes={{
            indicator: classes.indicator
          }}
          aria-label="scrollable auto tabs example">

          <Tab classes={{root: classes.tabRoot}} label={<CustomTab classes={classes} icon={value===0?Images.glasses_active:Images.glasses} showChip={true} title="To Review"/>} {...a11yProps(0)} />
          <Tab classes={{root: classes.tabRoot}} label={<CustomTab icon={value===1?Images.time_active:Images.time} title="Postponed"/>} {...a11yProps(1)} />
          <Tab classes={{root: classes.tabRoot}} label={<CustomTab icon={value===2?Images.checked_active:Images.checked} title="Confirmed"/>} {...a11yProps(2)} />
          <Tab classes={{root: classes.tabRoot}} label={<CustomTab icon={value===3?Images.export_active:Images.export} title="Exported"/>} {...a11yProps(3)} />
          <Tab classes={{root: classes.tabRoot}} label={<CustomTab icon={value===4?Images.trash_active:Images.trash} title="Deleted"/>} {...a11yProps(4)} />
        </Tabs>
      </AppBar> */}

          {/* <Typography>Page: {page}</Typography> */}

          <div className="startAcc">
            <Accordion disabled className="disabledAcc text-white">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Checkbox  value="checkedA"   inputProps={{ "aria-label": "Checkbox A" }} />

                <span className="mt-2">
                  <span className="header-span">
                    Vendor name <i class="fa fa-caret-down"></i>
                  </span>

                  <span className="ml-5 header-span">
                    Received at <i class="fa fa-caret-down"></i>
                  </span>

                  <span className="ml-5 text-white header-span">
                    Modified at <i class="fa fa-caret-down"></i>
                  </span>

                  <span className="ml-5 header-span">
                    Modified by <i class="fa fa-caret-down"></i>
                  </span>
                </span>
              </AccordionSummary>
            </Accordion>

            {vendor.length && vendor.map(vendor=>(
              <Accordion onClick={()=>getVendorDetails(vendor.id)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >

                <Checkbox
                  value="checkedA"
                  inputProps={{ "aria-label": "Checkbox A" }}
                />

                <span className="mt-2">
                  <span>
                    {vendor.supplier_name} <i class="fa fa-caret-down ml-2"></i>
                  </span>
                  <span className="ml-5">04</span>
                </span>
              </AccordionSummary>
              <AccordionDetails >
                <span className="selectedCount">03 Selected</span>

                <div className="pagDiv">
                  <Pagination
                    count={80}
                    page={page}
                    className="pagination"
                    onChange={handlePageChange}
                    color="primary" 
                  />
                </div>
              </AccordionDetails>
             {vendorDetails.length && vendorDetails.map(item=>(
              <AccordionDetails className="acc-div">
                <div>
                  <span>
                    <i class="fa fa-file-o"></i>
              <Link to={`/document_details/${item.id}`}>
             <span className="ml-2">{item.original_file_name}</span>
             </Link>
             <span className="margin-left-8">23</span>
             <span className="margin-left-8">44</span>
             {/* <span className="margin-left-8">{createDateStr(item.created_at)}</span>
             <span className="margin-left-8">{createDateStr(item.modified_at)}</span> */}

             <span className="margin-left-8">24</span>
                    <i class="fa fa-eye margin-left-5"></i>
                    <i class="fa fa-download ml-5"></i>
                    {/* <span className="ml-2" style={{cursor:'pointer'}} onClick={()=>{}}>Download</span> */}
                    <a href={`${process.env.REACT_APP_BASE_URL}/download_file/?id=${item.id}`} download="download_file">Download</a>
                  </span>
                </div>
              </AccordionDetails>
             )) }
              {/* <AccordionDetails className="acc-div">
                <div>
                  <span>
                    <i class="fa fa-file-o"></i>
                    <span className="ml-2">Invoice_bh</span>
                    <span className="margin-left-8">59</span>
                    <span className="margin-left-8">6</span>

                    <span className="margin-left-8">24</span>
                    <i class="fa fa-eye margin-left-5"></i>
                    <i class="fa fa-download ml-5"></i>
                    <span className="ml-2">Download</span>
                  </span>
                </div>
              </AccordionDetails>
              <AccordionDetails className="acc-div">
                <div>
                  <span>
                    <i class="fa fa-file-o"></i>
                    <span className="ml-2">Invoice_bh</span>
                    <span className="margin-left-8">59</span>
                    <span className="margin-left-8">6</span>

                    <span className="margin-left-8">24</span>
                    <i class="fa fa-eye margin-left-5"></i>
                    <i class="fa fa-download ml-5"></i>
                    <span className="ml-2">Download</span>
                  </span>
                </div>
              </AccordionDetails>
              <AccordionDetails className="acc-div">
                <div>
                  <span>
                    <i class="fa fa-file-o"></i>
                    <span className="ml-2">Invoice_bh</span>
                    <span className="margin-left-8">59</span>
                    <span className="margin-left-8">6</span>

                    <span className="margin-left-8">24</span>
                    <i class="fa fa-eye margin-left-5"></i>
                    <i class="fa fa-download ml-5"></i>
                    <span className="ml-2">Download</span>
                  </span>
                </div>
              </AccordionDetails> */}
            </Accordion>
            ))}






            {/* <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Checkbox
                  value="checkedA"
                  inputProps={{ "aria-label": "Checkbox A" }}
                />

                <span className="mt-2">
                  <span>
                    Spaze Tech park <i class="fa fa-caret-down ml-2"></i>
                  </span>
                  <span className="ml-5">02</span>
                </span>
              </AccordionSummary>
              <AccordionDetails>
                <span className="selectedCount">02 Selected</span>

                <div className="pagDiv">
                  <Pagination
                    count={80}
                    page={page}
                    className="pagination"
                    onChange={handlePageChange}
                    color="primary"
                  />
                </div>
              </AccordionDetails>
              <AccordionDetails className="acc-div">
                <div>
                  <span>
                    <i class="fa fa-file-o"></i>
                    <span className="ml-2">Invoice_bh</span>
                    <span className="margin-left-8">59</span>
                    <span className="margin-left-8">6</span>

                    <span className="margin-left-8">24</span>
                    <i class="fa fa-eye margin-left-5"></i>
                    <i class="fa fa-download ml-5"></i>
                    <span className="ml-2">Download</span>
                  </span>
                </div>
              </AccordionDetails>
              <AccordionDetails className="acc-div">
                <div>
                  <span>
                    <i class="fa fa-file-o"></i>
                    <span className="ml-2">Invoice_bh</span>
                    <span className="margin-left-8">59</span>
                    <span className="margin-left-8">6</span>

                    <span className="margin-left-8">24</span>
                    <i class="fa fa-eye margin-left-5"></i>
                    <i class="fa fa-download ml-5"></i>
                    <span className="ml-2">Download</span>
                  </span>
                </div>
              </AccordionDetails>
              <AccordionDetails className="acc-div">
                <div>
                  <span>
                    <i class="fa fa-file-o"></i>
                    <span className="ml-2">Invoice_bh</span>
                    <span className="margin-left-8">59</span>
                    <span className="margin-left-8">6</span>

                    <span className="margin-left-8">24</span>
                    <i class="fa fa-eye margin-left-5"></i>
                    <i class="fa fa-download ml-5"></i>
                    <span className="ml-2">Download</span>
                  </span>
                </div>
              </AccordionDetails>
              <AccordionDetails className="acc-div">
                <div>
                  <span>
                    <i class="fa fa-file-o"></i>
                    <span className="ml-2">Invoice_bh</span>
                    <span className="margin-left-8">59</span>
                    <span className="margin-left-8">6</span>

                    <span className="margin-left-8">24</span>
                    <i class="fa fa-eye margin-left-5"></i>
                    <i class="fa fa-download ml-5"></i>
                    <span className="ml-2">Download</span>
                  </span>
                </div>
              </AccordionDetails>
            </Accordion> */}






            {/* <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >

                <Checkbox
                  value="checkedA"
                  inputProps={{ "aria-label": "Checkbox A" }}
                />

                <span className="mt-2">
                  <span>
                    Hero bike <i class="fa fa-caret-down ml-2"></i>
                  </span>
                  <span className="ml-5">04</span>
                </span>
              </AccordionSummary>
              <AccordionDetails>
                <span className="selectedCount">03 Selected</span>

                <div className="pagDiv">
                  <Pagination
                    count={80}
                    page={page}
                    className="pagination"
                    onChange={handlePageChange}
                    color="primary"
                  />
                </div>
              </AccordionDetails>
              <AccordionDetails className="acc-div">
                <div>
                  <span>
                    <i class="fa fa-file-o"></i>
                    <span className="ml-2">Invoice_bh</span>
                    <span className="margin-left-8">59</span>
                    <span className="margin-left-8">6</span>

                    <span className="margin-left-8">24</span>
                    <i class="fa fa-eye margin-left-5"></i>
                    <i class="fa fa-download ml-5"></i>
                    <span className="ml-2">Download</span>
                  </span>
                </div>
              </AccordionDetails>
              <AccordionDetails className="acc-div">
                <div>
                  <span>
                    <i class="fa fa-file-o"></i>
                    <span className="ml-2">Invoice_bh</span>
                    <span className="margin-left-8">59</span>
                    <span className="margin-left-8">6</span>

                    <span className="margin-left-8">24</span>
                    <i class="fa fa-eye margin-left-5"></i>
                    <i class="fa fa-download ml-5"></i>
                    <span className="ml-2">Download</span>
                  </span>
                </div>
              </AccordionDetails>
              <AccordionDetails className="acc-div">
                <div>
                  <span>
                    <i class="fa fa-file-o"></i>
                    <span className="ml-2">Invoice_bh</span>
                    <span className="margin-left-8">59</span>
                    <span className="margin-left-8">6</span>

                    <span className="margin-left-8">24</span>
                    <i class="fa fa-eye margin-left-5"></i>
                    <i class="fa fa-download ml-5"></i>
                    <span className="ml-2">Download</span>
                  </span>
                </div>
              </AccordionDetails>
              <AccordionDetails className="acc-div">
                <div>
                  <span>
                    <i class="fa fa-file-o"></i>
                    <span className="ml-2">Invoice_bh</span>
                    <span className="margin-left-8">59</span>
                    <span className="margin-left-8">6</span>

                    <span className="margin-left-8">24</span>
                    <i class="fa fa-eye margin-left-5"></i>
                    <i class="fa fa-download ml-5"></i>
                    <span className="ml-2">Download</span>
                  </span>
                </div>
              </AccordionDetails>
            </Accordion> */}




            
          </div>

          {/*   <Pagination
            count={80}
            page={page}
            className="pagination"
            onChange={handlePageChange}
            color="primary"
          />
 */}
        {/*   <TabPanel value={value} index={0}>
            <InvoiceTable shouldUpdate={updateTable} />
            <br />
            <br />
            <br />
            <br />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <NoContentTab />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <NoContentTab />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <NoContentTab />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <NoContentTab />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <NoContentTab />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <NoContentTab />
          </TabPanel> */}

          {/* <div 
      className="form-inline control-base gradient-block"
      >
        <div className="btn-group col-md-4 align-items-center" style={{fontSize:'12px'}}>
            <button type="button" className="btn dropdown-toggle tablet-gradient mr-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={togglePaginationMenu}>
              {itemsPerPage}
            </button>items per page
            <div className="dropdown-menu">
              {
               [10,15,20,25,50,100].map(item => <a className="dropdown-item" onClick={() => getPerPageItems(item)} href="#">{item}</a>)
              }
          </div>
        </div>
        <div className="col-md-5" style={{display:'flex',justifyContent:'space-evenly'}}>
        <input
        onChange={addInvoice}
        style={{display:'none'}}
        id="contained-button-file"
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button component="span" variant="contained" classes={{root:classes.importBtn}} startIcon={<CloudUploadIcon/>}>
            UPLOAD
          </Button>
      </label>
        <Button variant="contained" classes={{root:classes.reviewBtn}} startIcon={<VisibilityIcon />} > Start Reviewing </Button>
        </div>
         </div>  */}
        </div>
      </div>
      {/* <label
        htmlFor="contained-button-file"
        style={{ position: "absolute", bottom: "1%", right: "20%" }}
      >
        <Button
          component="span"
          variant="contained"
          classes={{ root: classes.importBtn }}
          style={{ height: 30, borderRadius: 2 }}
         
        >
          <span style={{ color: "#000" }}>  <i class="fa fa-download"></i>  03 Download.xls</span>
        </Button>
      </label>


      <label
        htmlFor="contained-button-file"
        style={{ position: "absolute", bottom: "1%", right: "10%" }}
      >
        <Button
          component="span"
          variant="contained"
          classes={{ root: classes.importBtn }}
          style={{ height: 30, borderRadius: 2 }}
          startIcon={<CloudUploadIcon />}
          onClick={addInvoice}
        >
          <span style={{ color: "#000" }}>UPLOAD</span>
        </Button>
      </label> */}
      <label htmlFor="contained-button-file" style={{ cursor:'pointer',width:'9%',position: "absolute", bottom: "1%", right: "10%",backgroundColor: "#00f0cb",borderRadius: "6px", }}>
        <CloudUploadIcon style={{marginLeft:5}}/>
        <span  style={{ marginLeft: 7,color: "#000",fontWeight:'bold',fontFamily:'monospace'  }}>
          UPLOAD
          </span>
      </label>
      <input
        className="uploadBtn"
        id="contained-button-file"
        style={{ display: 'none' }}
        type={"file"}
        accept="application/pdf"
        onChange={addInvoice}
      // value={this.state.plant_gen_file}
      />

      <label
        htmlFor="contained-button-file"
        style={{
          position: "absolute",
          bottom: "1%",
          left: "5%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p style={{ marginBottom: "10%", textAlign: "center",fontSize:20 }}>
         {amount}
        </p>
        <p style={{ marginBottom: "2%", textAlign: "center",fontSize:"12px", fontFamily: "'Roboto' , 'Helvetica', 'Arial', 'sans-serif'" }}>
          Last Month Bill
        </p>
        <Button
          component="span"
          variant="contained"
          classes={{ root: classes.importBtn }}
          style={{ height: 30, borderRadius: 2 }}
        >
          <span style={{ color: "#000", paddingLeft: 10, paddingRight: 10 }}>
            Pay Now
          </span>
        </Button>
      </label>
    </>
  );
};
export default Dashboard;
