import React, { useState, useEffect } from "react";
import "./account.module.scss";
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
import Pagination from "@material-ui/lab/Pagination";
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Report from "./Report";
import Account from "./Account";
import CustomInput from "../../components/custom-input";
import Billing from "./Billing";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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
    /* background: theme_colors.secondary, */
    background: "#86b5e0",
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

  removeBtn: {
    backgroundColor: "#031B40",
    color: "#00f0cb",
    border: "1px solid #00f0cb",
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

// const CustomTab = ({iconClass,title}) => <div className="custom-tab"><i className={`fa ${iconClass} mr-2`} aria-hidden="true"></i>{title}</div>
const CustomTab = ({ title, icon, showChip, classes }) => (
  <div className="custom-tab">
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

const Index = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const [value, setValue] = React.useState(0);
  const [paginMenu, setPaginMenu] = React.useState(false);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [profileMenuShow, setProfileMenuShow] = React.useState(false);
  const [authToken, setAuthToken] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [amount, setAmount] = React.useState(0);
  const [oldPass, setOldPass] = React.useState();
  const [newPass, setNewPass] = React.useState();
  const [confirmPass, setConfirmPass] = React.useState();
  const [errorMsg,setError] = React.useState('')

  const classes = accordionStyles();
  const summaryClass = accoSummaryStyles();

  useEffect(() => {
    var auth = fetchAuthToken();
    setAuthToken(auth);
    getAmount();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  var time = null;
  clearTimeout(time);
  if (successMsg) {
    time = setTimeout(() => setSuccessMsg(""), 4000);
  }

  const getAmount = () => {
    let authToken = fetchAuthToken();

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
        setAmount(response.data.total_amount);
      })
      .catch(function (error) {
        //handle error
      });
  };

  const onSave = () => {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_BASE_URL}/update_password/`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data:{
          "current_password":oldPass,
          "new_password":newPass,
          "confirm_password":confirmPass
        }})
        .then(function (response) {
          console.log("onSave", response);
        })
        .catch(error => {
          if (error.response) {
          console.error("ERR::",error);
          }
        })
    
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
              </div>
            </div>
          </div>

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
                    icon={value === 0 ? Images.userLogo_active : Images.userLogo}
                    // showChip={true}
                    title="Accounts"
                  />
                }
                {...a11yProps(0)}
              />
              <Tab
                classes={{ root: classes.tabRoot }}
                label={
                  <CustomTab
                    icon={value === 1 ? Images.bill : Images.bill}
                    title="Billing Details"
                  />
                }
                {...a11yProps(1)}
              />
              <Tab
                classes={{ root: classes.tabRoot }}
                label={
                  <CustomTab
                    icon={value === 2 ? Images.curveLine_active : Images.curveLine}
                    title="Report"
                  />
                }
                {...a11yProps(2)}
              />
              <Tab
                classes={{ root: classes.tabRoot }}
                label={
                  <CustomTab
                    icon={value === 3 ? Images.about_active : Images.about}
                    title="About"
                  />
                }
                {...a11yProps(3)}
              />
            </Tabs>
          </AppBar>

          <div className="mt-4 bottom-div"></div>
        </div>

        {/*- - - - - - - - - - - - - - -  R H S  - - - - - - - - - - - - - - - */}

        <div className="invoice-side pt-2" onClick={closeProfileMenu}>
          <div class="col-md-4 basic-search mt-3" style={{ marginLeft: "65%" }}>
            <div class="input-field">
              <i class="fa fa-long-arrow-left mr-4" aria-hidden="true"></i>
             {/*  <i class="fa fa-cog mr-2" aria-hidden="true"></i> */}
                <img src={Images.gear} width="16" className="mr-4" />
              <Chip
                className="ml-8"
                classes={{ root: classes.emailChip }}
                avatar={
                  <Avatar classes={{ root: classes.emailLogo }}>U</Avatar>
                }
                label="shiv.shah@oodlestechnologies.com"
              />
            </div>
            {/*     <div className="logout-btn mt-1" style={{ marginRight: 25 }}>
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
            </div> */}
          </div>
          
          <div className="startAcc" style={{ display: 'flex' }}>
                {value===2&&<Report />}
                {value===1&&<Billing />}
 
          </div>

          {value===0 &&<AppBar position="static" className="main-header">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Account" {...a11yProps(0)} className="accountTab" />
              <Tab label="Help" {...a11yProps(1)} />
            </Tabs>
          </AppBar>}
          <TabPanel value={value} index={0}>
            <div class="row">
              <img
                className="userIcon rounded-circle ml-5"
                height="50px"
                src={Images.person}
              />

              <div className="mt-2 ml-5">
                <Button
                  component="span"
                  variant="contained"
                  classes={{ root: classes.importBtn }}
                  style={{ height: 30, borderRadius: 2 }}
                >
                  <span
                    style={{ color: "#000", paddingLeft: 10, paddingRight: 10 }}
                  >
                    Upload
                  </span>
                </Button>

                <Button
                  component="span"
                  variant="contained"
                  classes={{ root: classes.removeBtn }}
                  style={{ height: 30, borderRadius: 2, marginLeft: "50px" }}
                >
                  <span
                    style={{
                      color: "#00f0cb",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    Remove
                  </span>
                </Button>
              </div>
            </div>

            <div className="row details_one">
              <div className="col-sm-4 px-5">
                <label className="inputTagLabel">First name</label>
                <CustomInput
                  type="text"
                  maxLength="50"
                  name="fullName"
                  className="form-control"
                  name="fullName"
                />
              </div>
              <div className="col-sm-4 px-5">
                <label className="inputTagLabel">Last name</label>

                <CustomInput
                  type="text"
                  maxLength="50"
                  name="companyName"
                  className="form-control"
                />
              </div>
            </div>

            <div className="row details_one">
              <div className="col-sm-4 px-5">
                <label className="inputTagLabel">E-mail</label>

                <CustomInput
                  type="text"
                  maxLength="50"
                  name="companyName"
                  className="form-control"
                />
              </div>
            </div>

            <div className="row details_one mt-2">
              <div className="col-sm-4 px-5">
                <span>Password</span>
              </div>
            </div>

            <div className="row details_one">
              <div className="col-sm-4 px-5">
                <label className="inputTagLabel">Old password</label>

                <CustomInput
                  type="text"
                  maxLength="50"
                  name="companyName"
                  className="form-control"
                  onChange={(event)=>setOldPass(event.target.value)}
                  isPassword={true}
                />
              </div>
            </div>

            <div className="row details_one">
              <div className="col-sm-4 px-5">
                <label className="inputTagLabel">New password</label>

                <CustomInput
                  type="text"
                  maxLength="50"
                  name="companyName"
                  className="form-control"
                  onChange={(event)=>setNewPass(event.target.value)}
                  isPassword={true}
                />
                <span class="dot"></span>
                <span className="font-10 ml-1">8+ characters</span>

                <span class="dot ml-2"></span>
                <span className="font-10 ml-1">One capital letter</span>

                <span class="dot ml-2"></span>
                <span className="font-10 ml-1">One Number</span>
              </div>
            </div>

            <div className="row details_one">
              <div className="col-sm-4 px-5">
                <label className="inputTagLabel">Confirm password</label>

                <CustomInput
                  type="text"
                  maxLength="50"
                  name="companyName"
                  className="form-control"
                  onChange={(event)=>setConfirmPass(event.target.value)}
                  isPassword={true}
                />

                <span class="dot"></span>
                <span className="font-10 ml-1">8+ characters</span>

                <span class="dot ml-2"></span>
                <span className="font-10 ml-1">One capital letter</span>

                <span class="dot ml-2"></span>
                <span className="font-10 ml-1">One Number</span>
                <div className="form-group text-danger text-center" style={{fontSize:'12px'}}>{errorMsg}</div>
              </div>
            </div>

            <div className="mt-4 btn-save">
              <Button
                component="span"
                variant="contained"
                classes={{ root: classes.removeBtn }}
                style={{ height: 30, borderRadius: 2, marginRight: "30px" }}
              >
                <span
                  style={{
                    color: "#00f0cb",
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  Discard
                </span>
              </Button>

              <Button
                component="span"
                variant="contained"
                classes={{ root: classes.importBtn }}
                style={{ height: 30, borderRadius: 2 }}
                onClick={onSave}
              >
                <span
                  style={{ color: "#000", paddingLeft: 10, paddingRight: 10 }}
                >
                  Save
                </span>
              </Button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={10}>
            Help
          </TabPanel>
        </div>
      </div>

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
        <p style={{ marginBottom: "10%", textAlign: "center", fontSize: 20 }}>
          {amount}
        </p>
        <p
          style={{
            marginBottom: "2%",
            textAlign: "center",
            fontSize: "12px",
            fontFamily: "'Roboto' , 'Helvetica', 'Arial', 'sans-serif'",
          }}
        >
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
export default Index;