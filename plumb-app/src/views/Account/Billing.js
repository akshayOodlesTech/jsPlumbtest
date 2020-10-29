import React from "react";
import "./billing.module.scss";
import AppBar from "@material-ui/core/AppBar";
import Images from "../../assets/asset_imports";
import { Tab, Tabs, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import CustomInput from "../../components/custom-input";
import "./account.module.scss";
import "../../assets/css/style.scss";
import theme_colors from "../../utils/theme";

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

export default function Billing() {
  const classes = accordionStyles();

  return (
    <div style={{ marginTop: "6px" }} className="mainDiv">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">From</th>
            <th scope="col">Description</th>
            <th scope="col">To</th>
            <th scope="col">Amount</th>

            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01/05/2019</td>
            <td>Oodles Tech, Agent...</td>
            <td>03/07/2019</td>
            <td>15.02 $</td>
            <td>
              <Button
                component="span"
                variant="contained"
                classes={{ root: classes.removeBtn }}
                style={{ height: 30, borderRadius: 2 }}
              >
                <span
                  style={{
                    color: "#00f0cb",
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  Download
                </span>
              </Button>

              <Button
                component="span"
                variant="contained"
                classes={{ root: classes.importBtn }}
                style={{ height: 28, borderRadius: 2, marginLeft: "50px", width: "100px" }}
              >
                <span
                  style={{ color: "#000", paddingLeft: 10, paddingRight: 10 }}
                >
                  Pay
                </span>
              </Button>
            </td>
          </tr>
          <tr>
            <td>01/05/2019</td>
            <td>Hcl Tech, Agent...</td>
            <td>03/07/2019</td>
            <td>15.02 $</td>
            <td>
              <Button
                component="span"
                variant="contained"
                classes={{ root: classes.removeBtn }}
                style={{ height: 30, borderRadius: 2 }}
              >
                <span
                  style={{
                    color: "#00f0cb",
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  Download
                </span>
              </Button>

              <Button
                component="span"
                variant="contained"
                classes={{ root: classes.importBtn }}
                style={{ height: 28, borderRadius: 2, marginLeft: "50px", width: "100px"}}
              >
                <span
                  style={{ color: "#000", paddingLeft: 10, paddingRight: 10 }}
                >
                  Pay
                </span>
              </Button>
            </td>
          </tr>
          <tr>
            <td>01/05/2019</td>
            <td>Spaze Tech, Agent...</td>
            <td>03/07/2019</td>
            <td>15.02 $</td>
            <td>
              <Button
                component="span"
                variant="contained"
                classes={{ root: classes.removeBtn }}
                style={{ height: 30, borderRadius: 2 }}
              >
                <span
                  style={{
                    color: "#00f0cb",
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  Download
                </span>
              </Button>

              <Button
                component="span"
                variant="contained"
                classes={{ root: classes.importBtn }}
                style={{  height: 28, borderRadius: 2, marginLeft: "50px", width: "100px" }}
              >
                <span
                  style={{ color: "#000", paddingLeft: 10, paddingRight: 10 }}
                >
                  Pay
                </span>
              </Button>
            </td>
          </tr>
          <tr>
            <td>01/05/2019</td>
            <td>Google Tech, Agent...</td>
            <td>03/07/2019</td>
            <td>15.02 $</td>
            <td>
              <Button
                component="span"
                variant="contained"
                classes={{ root: classes.removeBtn }}
                style={{ height: 30, borderRadius: 2 }}
              >
                <span
                  style={{
                    color: "#00f0cb",
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  Download
                </span>
              </Button>

              <Button
                component="span"
                variant="contained"
                classes={{ root: classes.importBtn }}
                style={{  height: 28, borderRadius: 2, marginLeft: "50px", width: "100px" }}
              >
                <span
                  style={{ color: "#000", paddingLeft: 10, paddingRight: 10 }}
                >
                  Pay
                </span>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
