import React, { Component, useEffect, useState } from 'react';
import './navbar.module.scss'
import '../../assets/css/style.scss';
import Images from '../../assets/asset_imports';
import {Chip,Avatar,Tooltip, makeStyles} from '@material-ui/core';
import theme_colors from '../../utils/theme';
import { withRouter } from 'react-router-dom';

const navbarStyles = makeStyles((theme) => ({
  emailChip : {
    background: 'rgba(255,255,255,0.1)',
    cursor:'pointer',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.2)',
      color: '#FFF'
  }},
  emailLogo : {
    background: theme_colors.secondary,
    color:`${theme_colors.primary} !important`,
  }
}));
     

const Navbar = (props) =>  {

  const [companyId, setCompanyId] = useState('');
  const [profileMenuShow, setProfileMenuShow] = React.useState(false);

  const classes = navbarStyles();

  const getCompanyId = async() => {
    var company = await localStorage.getItem('company_id');
    setCompanyId(company);
  }

  useEffect(()=>{
    getCompanyId();  
  },[])

  const profileAction = () => {
    setProfileMenuShow(!profileMenuShow);
  }

  const handleLogout = async() => {
    await localStorage.removeItem('auth_token');
    props.history.replace({ pathname: '/Login' })
  }
    return (
      <>
        <nav className="navbar justify-content-between right-header">
          {/* {
            !props.noPageTitle ? <a id="invoice-table" className="navbar-brand">Page: 1<label>/1</label></a>:
            <a id="invoice-table" className="navbar-brand"><label></label></a>
          } */}

          {
            props.children
          }
          
          <form className="form-inline control-section">
            <div className="icon-badge mx-2">
            <img src={Images.matrix_icon} style={{width:'100%'}} className="img-responsive" alt=""/>
           </div>
            <Chip onClick={()=>profileAction()} classes={{root:classes.emailChip}} avatar={<Avatar classes={{root:classes.emailLogo}}>U</Avatar>} label={companyId}/>
          </form>
        </nav>
        { 
        profileMenuShow &&
        <div className="profile-menu show">
          <a className="dropdown-item" href="#">My Account</a>
          <a className="dropdown-item" href="#" onClick={handleLogout}>Sign Out</a>
        </div>
        }
        </>
    );}

export default withRouter (Navbar);