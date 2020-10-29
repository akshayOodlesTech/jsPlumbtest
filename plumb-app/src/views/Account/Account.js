import React, { useState } from 'react'
import AppBar from "@material-ui/core/AppBar";
import Images from "../../assets/asset_imports";
import {
    Tab,
    Tabs,
    Button,
    Box
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import CustomInput from "../../components/custom-input";
import "./account.module.scss";
import "../../assets/css/style.scss";
import theme_colors from "../../utils/theme";

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
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }

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

export default function Account() {
    const [tab, setTab] = useState(0);
    const classes = accordionStyles();
    const handleChange = () => {

    }
    return (
        < >
            <AppBar position="static" className="main-header">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="Account" className="accountTab" {...a11yProps(0)} />
                    <Tab label="Help" />
                </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>

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
                        />

                        <span class="dot"></span>
                        <span className="font-10 ml-1">8+ characters</span>

                        <span class="dot ml-2"></span>
                        <span className="font-10 ml-1">One capital letter</span>

                        <span class="dot ml-2"></span>
                        <span className="font-10 ml-1">One Number</span>
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
                    >
                        <span
                            style={{ color: "#000", paddingLeft: 10, paddingRight: 10 }}
                        >
                            Save
                </span>
                    </Button>
                </div>

            </TabPanel>
            <TabPanel value={tab} index={1}>
            Help
          </TabPanel>
        </>
    )
}
