/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import './resetPassword.module.scss'
import PasswordFeild from '../../components/password-feild';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import LeanValidation from 'lean-validation';
import validation from './form-validation';
import Loader from '../../components/Loader';
import { withRouter } from "react-router";
import SnackbarComponent from '../../components/SnackbarComponent';
import Images from '../../assets/asset_imports';
import history from '../../utils/history';

class ResetPassword extends React.Component{

  constructor(props){
    super(props);
    this.validator = new LeanValidation(validation);
    this.state = {
      newPassword:'',
      confirmPassword:'',
      validation: this.validator.valid(),
      errorMsg:'',
      isLoading:false,
      successMsg:'',
      authToken:''
    }}

    componentDidMount(){
      var authToken = this.props.match.params.token;
      this.setState({authToken})    
    }

  handleResetPassword = (event) => {
    event.preventDefault();   
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    const reqData = {
      password : this.state.newPassword,
      confirm_password: this.state.confirmPassword,
      token: this.state.authToken
    }
    if (validation.isValid) {
      this.setState({isLoading:!this.state.isLoading})
      axios.post(`${BASE_URL}/reset/`, reqData)
      .then(res => {
        this.setState({isLoading:!this.state.isLoading,
                       successMsg: res.data.message})
        console.log("forgetResp",res);
        console.log(res.data);
        history.push('/Login')
      })
      .catch(error => {
        if (error.response) {
          console.error("ERR::",error);
          this.setState({errorMsg:error.response.data.non_field_errors[0],
                         isLoading:!this.state.isLoading});
          }
      })
    }}

  storeFeildValue = (event) => this.setState({[event.target.name]:event.target.value})

  getCapsLetter = () => {
    let {newPassword} = this.state;
    var tempLength = newPassword.length;
    var count = 0;
    var i = 0;
    for (; i < tempLength; i++) {
      if (newPassword.charAt(i) === newPassword.charAt(i).toUpperCase()) {
          count++;
    }}
    if(count>0){
      return 'blue';
    }
    return 'gray';
  }

  getCharactersCount = () => {
    if(this.state.newPassword.length>7){
      return 'blue';
    }
    return 'gray';
  }

  getOneNumber = () => {
    var matches = this.state.newPassword.match(/\d+/g);
      if (matches != null) {
          return 'blue';
      }
    return 'gray';
  }
  
  render() {

    var time = null;
    clearTimeout(time);
    if(this.state.successMsg){
    time = setTimeout(()=>this.setState({successMsg:''}),4000)
    }

    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
    return (
      <div className="rp-main_container">
      <SnackbarComponent message={this.state.successMsg} open ={this.state.successMsg}/> 
<div className="resetpass-form col-sm-3">
    <form >
    <input type="hidden" value="something"/>
    <div className="form-group d-flex justify-content-center">
      <img src={Images.app_logo} className="img-responsive" style={{width:'90%'}} alt=""/>
    </div>

    <div className="form-group text-center mt-1" style={{fontSize:'13px'}}>
       Now you can set your new password
		</div>

        <div className="form-group">
        	<input type="password" maxLength="16" className="form-control" name="newPassword" placeholder="New Password" onChange={this.storeFeildValue}/>
          <a className="text-danger">{validation.newPassword.message&&<i className="fa fa-exclamation-circle mr-1" aria-hidden="true"></i>}{validation.newPassword.message}</a>        
          <div className="d-flex justify-content-between password-verify mt-1">
        <p><span style={{color:this.getCharactersCount()}}>⚫</span>8+ Characters</p>
        <p><span style={{color:this.getCapsLetter()}}>⚫</span>One capital letter</p>
        <p><span style={{color:this.getOneNumber()}}>⚫</span>One number</p>
        </div>
        </div>
        
        <div className="form-group">
        	<input type="password" maxLength="16" className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={this.storeFeildValue}/>
          <a className="text-danger">{validation.confirmPassword.message&&<i className="fa fa-exclamation-circle mr-1" aria-hidden="true"></i>}{validation.confirmPassword.message}</a>        
        </div>
    <div className="form-group text-danger text-center" style={{fontSize:'12px'}}>{this.state.errorMsg}</div>
		<div className="form-group">
            <Link to="/dashboard">
            <button type="submit" className="btn btn-lg btn-block sign-btn" onClick={this.handleResetPassword}>{this.state.isLoading?<i className="fa fa-circle-o-notch fa-spin"></i>:"Update Password"}</button>
            </Link>
        </div>
    <div className="form-group text-center ">
    <Link to="/sign_up">
    <button className="no-account" >Back to Sign In</button>
    </Link>
    </div>

    </form>
</div>
</div>
    );
  }
}

export default withRouter(ResetPassword);
