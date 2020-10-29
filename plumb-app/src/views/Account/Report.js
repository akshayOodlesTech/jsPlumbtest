import React,{useEffect} from 'react'
import { data } from './chartData'
import { LineChart, CartesianGrid, XAxis, YAxis, AreaChart, Line, Tooltip, BarChart, Bar, Label, ReferenceLine, ComposedChart, Area } from 'recharts';
import MenuIcon from "@material-ui/icons/Menu";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from "@material-ui/core/Menu";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { fetchAuthToken } from "../../utils/Helpers";
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
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

export default function Report(props) {
  const [year, setYear] = React.useState(null);
  const [month, setMonth] = React.useState(null);
  const [report, setReport] = React.useState([]);
  const accordionStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = accordionStyles();

  useEffect(()=>{
    getReportData()
  },[])

  const getReportData = ()=>{
    let  authToken = fetchAuthToken();
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/reports/`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(function (response) {
        //handle success
        console.log("report", response);
        setReport(response.data)
      })
      .catch(function (error) {
        //handle error

      });
  }

    return (
       <div style={{marginTop:'0%'}}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3%' }}>
              <FormControl className={classes.formControl}>
                {/* <InputLabel id="demo-simple-select-outlined-label" style={{marginLeft:'49rem',color:'#FFF'}}>Select year</InputLabel> */}
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  label="Select year"
                  style={{ width: 100, marginLeft: '49rem', color: '#FFF' }}
                >
                  <MenuItem value="">
                    <em>Select year</em>
                  </MenuItem>
                  <MenuItem style={{ color: '#FFF', backgroundColor: '#062241' }} value={10}>2018</MenuItem>
                  <MenuItem style={{ color: '#FFF', backgroundColor: '#062241' }} value={20}>2019</MenuItem>
                  <MenuItem style={{ color: '#FFF', backgroundColor: '#062241' }} value={30}>2020</MenuItem>
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                {/* <InputLabel id="demo-simple-select-outlined-label" style={{marginLeft:'2rem',color:'#FFF'}}>Select year</InputLabel> */}
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  label="Select month"
                  style={{ width: 100, marginLeft: '2rem', color: '#FFF' }}
                >
                  <MenuItem value="">
                    <em>Select month</em>
                  </MenuItem>
                  <MenuItem style={{ color: '#FFF', backgroundColor: '#062241' }} value={10}>Jan</MenuItem>
                  <MenuItem style={{ color: '#FFF', backgroundColor: '#062241' }} value={20}>Feb</MenuItem>
                  <MenuItem style={{ color: '#FFF', backgroundColor: '#062241' }} value={30}>Mar</MenuItem>
                </Select>
              </FormControl>
            </div>
          <AreaChart width={730} height={250} data={report} 
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="no_of_invoice" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
       </div>

    )
}
