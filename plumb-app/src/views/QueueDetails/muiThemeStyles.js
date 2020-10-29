import {makeStyles} from '@material-ui/core';
import theme_colors from '../../utils/theme';

export default makeStyles((theme) => ({
    root: {
      color:'#fff',
      width: '100%',
      background:'transparent',
      boxShadow:'none',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      color:'#fff'
    },
    content: {
      color:'#062241',
      background:'rgba(255,255,255,0.1)',
      fontWeight:'600',
      padding:'6px',
      // justifyContent:'space-between',
      alignItems:'center',
      cursor:'pointer',
      justifyContent: 'space-between',
      paddingLeft: '40px'
    },
    contentList:{
      backgroundColor:'transparent',
      fontSize:'12px'
    },
    arrowIcon : {
      padding:'0',
    },
    badgeRoot:{
      background: theme_colors.secondary,
      width:'33px',
      height:'17px',
      color:theme_colors.primary
    },
    badgeLabel:{
      color:theme_colors.primary
    },
    poweredBy:{
      borderRight:'1px solid #c7c7c7'
    },
    emailChip : {
      background: 'rgba(255,255,255,0.1)',
      cursor:'pointer',
      '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF'
    }
    },
    emailLogo : {
      background: theme_colors.secondary,
      color:`${theme_colors.primary} !important`,
    },
    appbarRoot:{
      padding: '0 15px',
      background:'transparent',
      boxShadow:'none'
    },
    indicator: {
      backgroundColor: theme_colors.secondary,
    },
    tabRoot:{
      width:'180px'
    },
    importBtn : {
      // backgroundColor: theme_colors.primary,
      background: 'rgb(2,27,65)',
      background: 'linear-gradient(0deg, rgba(2,27,65,1) 49%, rgba(35,67,115,1) 100%)',
      borderRadius:'10px',
      '&:hover': {
        backgroundColor: theme_colors.primary,
        color: '#FFF'
      }
    },
    reviewBtn:{
      backgroundColor:theme_colors.primary,
      background: 'rgb(2,27,65)',
      background: 'linear-gradient(0deg, rgba(2,27,65,1) 49%, rgba(35,67,115,1) 100%)',
      borderRadius:'10px',
      padding:'10px 20px',
      '&:hover': {
        backgroundColor: theme_colors.primary,
        color: '#FFF'
    }},
    backdrop: {
      zIndex: 10,
      color: '#fff',
    },
  }));
