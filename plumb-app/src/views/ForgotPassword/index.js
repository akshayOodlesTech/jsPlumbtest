/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import './Forgot_password.scss'
import PasswordFeild from '../../components/password-feild';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import LeanValidation from 'lean-validation';
import validation from './form-validation';
import Loader from '../../components/Loader';
import SnackbarComponent from '../../components/SnackbarComponent';
import Images from '../../assets/asset_imports';
import history from '../../utils/history';

class ForgotPassword extends React.Component{

  constructor(props){
    super(props);
    this.validator = new LeanValidation(validation);

    this.state = {
      userEmail:'',
      validation: this.validator.valid(),
      errorMsg:'',
      successMsg:'',
      showToast:true,
      isLoading:false
    }
    this.submitted = false;
  }

  handleResetPassword = (event) => {
    event.preventDefault();   

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    const reqData = {
      email : this.state.userEmail,
    }
    if (validation.isValid) {
      this.setState({isLoading:!this.state.isLoading})
      axios.post(`${BASE_URL}/forget/`, reqData)
      .then(res => {
        this.setState({isLoading:!this.state.isLoading,
                        successMsg: res.data.message,
                      })
        console.log("forgetResp",res);
        history.push('/Login')
      })
      .catch(error => {
        if (error.response) {
          this.setState({isLoading:!this.state.isLoading,
                         errorMsg:error.response.data.non_field_errors[0]
                        });
          }
      })
    }}

  storeFeildValue = (event) => this.setState({[event.target.name]:event.target.value,errorMsg:''})

  
  render() {
    var time = null;
    clearTimeout(time);
    if(this.state.successMsg){
    time = setTimeout(()=>this.setState({successMsg:''}),4000)
    }
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;

    return (
      <div className="main-div">

<div className="center-txt">

<div className="header-div">
<h5 className="padd-mar-0 mb-1">WELCOME TO EXTRICATOR</h5>

<p className="padd-mar-0 txt-left font-size" >It takes just three short steps to sign up. It is free and we won’t ask you
for credit card information. First, we need to know how to pre-configure the list of captured data fields - choose a region corresponding to the invoices you will be processing the most.</p> 

</div>

</div>




       <SnackbarComponent message={this.state.successMsg} open ={this.state.successMsg}/> 
    <div className="forgot-form col-sm-3">
    <form >
    <input type="hidden" value="something"/>
    <div className="form-group d-flex justify-content-center" style={{margin:"0"}}>
      <img src={Images.app_logo} className="img-responsive" style={{width:'90%'}} alt=""/>
    </div>
      <div className="form-group mt-4">
		    <h6>Forgot Password?</h6>
    </div>

    <div className="form-group text-center mt-1" style={{fontSize:'13px',lineHeight:'13px'}}>
    Enter the registered email. You will receive an email with further instructions to reset your password.
		</div>

        <div className="form-group mt-2">
        	<input type="email" maxLength="50" className="form-control" name="userEmail" placeholder="Email" onChange={this.storeFeildValue}/>
          <a className="text-danger">{validation.userEmail.message&&<i className="fa fa-exclamation-circle mr-1" aria-hidden="true"></i>}{validation.userEmail.message}</a>        
        </div>

    <div className="form-group text-danger text-center" style={{fontSize:'12px'}}>{this.state.errorMsg}</div>

		<div className="form-group">
            <Link to="/dashboard">
            <button  type="submit" className="btn btn-lg btn-block sign-btn send" onClick={this.handleResetPassword}>{this.state.isLoading?<i className="fa fa-circle-o-notch fa-spin"></i>:"Send"}</button>
            </Link>
        </div>
    <div className="form-group text-center ">
    <Link to="/Login">
   {/*  <button className="no-account" >Back to Sign In</button> */}

    <span className="signup" >Back to <span className="sign-up-txt">Sign In.</span></span>


    </Link>
    </div>

    </form>
</div>
</div>
    );
  }
}

export default ForgotPassword;
