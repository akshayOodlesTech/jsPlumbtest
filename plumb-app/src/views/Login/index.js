/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import './login.module.scss'
import PasswordFeild from '../../components/password-feild';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../../utils/history';
import LeanValidation from 'lean-validation';
import validation from './form-validation';
import Loader from '../../components/Loader';
import CustomInput from '../../components/custom-input';
import Images from '../../assets/asset_imports';
import { BASE_URL } from '../../utils/constants';

class Login extends React.Component{

  constructor(props){
    super(props);
    this.validator = new LeanValidation(validation);
    this.state = {
      userEmail:'',
      userPassword:'',
      validation: this.validator.valid(),
      errorMsg:'',
      isLoading:false
    }
    this.submitted = false;
  }

  componentDidMount(){
    var token = localStorage.getItem('auth_token');
    if(token){
      this.props.history.replace({ pathname: '/dashboard' })
    }
  }

  getPassword = (event) => {
    console.warn(event.target.value)
  }

  handleSignin = (event) => {
    event.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    const reqData = {
      email : this.state.userEmail,
      password : this.state.userPassword
    }
      if (validation.isValid) {
        this.setState({isLoading:!this.state.isLoading})
        axios.post(`${process.env.REACT_APP_BASE_URL}/login/`, reqData)
        .then(res => {
          console.error("RESPP::",res);
          
        this.setState({isLoading:!this.state.isLoading})
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('company_id', res.data.email);
          this.props.history.push('/dashboard')
        })
        .catch(error => {
          if (error.response) {
          console.error("ERR::",error);
          // this.setState({errorMsg:error.response.data.non_field_errors[0]});
          }
          this.setState({isLoading:!this.state.isLoading})
        })
      }
    }

  storeFeildValue = (event) => this.setState({[event.target.name]:event.target.value,errorMsg:''})
  
  render  () {
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

<div className="login-form col-sm-3">
    <form >
    <input type="hidden" value="something"/>
      <div className="d-flex justify-content-center">
      <img src={Images.app_logo} className="img-responsive" style={{width:'70%'}} alt=""/>
    </div>
        <div className="form-group mt-4 border-rad">
         {/*  <CustomInput icon={Images.input_email} type="email" name="userEmail" maxLength="50" placeholder="Email" onChange={this.storeFeildValue}/> */}

         <CustomInput type="email" name="userEmail" maxLength="50" placeholder="Email" onChange={this.storeFeildValue}/>

           <a className="text-danger">{validation.userEmail.message&&<i className="fa fa-exclamation-circle mr-1" aria-hidden="true"></i>}{validation.userEmail.message}</a>        
        </div>
        <CustomInput maxLength="16" placeholder="Password" name="userPassword" onChange={this.storeFeildValue} isPassword={true}/>
        <a className="text-danger">{validation.userPassword.message&&<i className="fa fa-exclamation-circle mr-1" aria-hidden="true"></i>}{validation.userPassword.message}</a>        
  
    <div className="form-group text-center mt-1" style={{fontSize:'11px'}}>
			You agree with our <a href="#">terms</a>
		</div>
    <div className="form-group text-danger text-center" style={{fontSize:'12px'}}>{this.state.errorMsg}</div>
    <Loader/>
		<div className="form-group">
            <button type="submit" onClick={this.handleSignin} className="btn btn-lg btn-block sign-btn sign-btn-0">{this.state.isLoading?<i className="fa fa-circle-o-notch fa-spin"></i>:"Sign In"}</button>
        </div>

        
      <div className="form-group text-center">
			<a className="forgot-pass" href="/Forgot_Password">Forgot password?</a>
		</div>
    <div className="form-group text-center ">
    <Link to="/sign_up" class="signup">
    {/* <button className="no-account" >Don't have an account? Sign up.</button> */}
    <span className="signup" >Don't have an account? <span className="sign-up-txt">Sign up.</span></span>

    </Link>
    </div>

    </form>
</div>
</div>
    );
  }
}

export default Login;
