/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Component } from 'react';
import './signup.module.scss'
import PasswordFeild from '../../components/password-feild';
import { Link } from 'react-router-dom';
import Images from '../../assets/asset_imports';
import {Stepper,Step,StepLabel,StepContent,Typography, StepConnector} from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import history from '../../utils/history';
import LeanValidation from 'lean-validation';
import {firstValidation,secondValidation} from './form-validation';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import SnackbarComponent from '../../components/SnackbarComponent';
import theme_colors from '../../utils/theme';
import clsx from 'clsx';
import CustomInput from '../../components/custom-input';

const useQontoStepIconStyles = makeStyles({
  root: {
    color: 'red',
    display: 'flex',
    height: 22,
    width: 22,
    textAlign:'center',
    borderRadius:'10px',
    alignItems: 'center',
    backgroundColor: theme_colors.secondary

  },
  active: {
    color: '#784af4',
  },
  completed: {
    color: 'black',
    zIndex: 1,
    fontSize: '25px',
    background: theme_colors.primary,
    borderRadius: '9px'
  },
});

const styles = {
  root: {
    background: 'transparent',
    padding: 0
  },
  connector: {
    borderColor: theme_colors.secondary
  }
};

const invoice_types = [{
    title: "EU Invoices",
    text: "VAT invoices with EU-style bank information."
  },{
    title: "UK Invoices",
    text: "Also best for India, Canada and Australia."
  },{
    title: "US Invoices",
    text: "Tax invoices in the US and internationally."
  }]

  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
    return (
      <div className={clsx(classes.root,{[classes.active]: active,})}>
        {completed ? <Check className={classes.completed} />:<div className={classes.circle}/>}
      </div>
    );
  }

  const TitleHead = ({head,tail}) => <h6 style={{margin:'0 22px',textAlign:'left'}}>{head}<span style={{marginLeft:'5px'}}>{tail}</span>
  </h6>

class SignUp extends Component {


  constructor(props){
    super(props);
    this.validatorOne = new LeanValidation(firstValidation);
    this.validatorTwo = new LeanValidation(secondValidation);
    this.submittedOne = false;
    this.submittedTwo = false;
    this.state = {
      validationOne: this.validatorOne.valid(),
      validationTwo: this.validatorTwo.valid(),
      businessEmail: '',
      businessPassword: '',
      companyName: '',
      fullName: '',
      phoneNumber: '',
      activeStep:0,
      termsAccepted:true,
      errorMsg:'',
      isLoading:false,
      successMsg:''
    }
  }

   navigateToDashboard = (event) => {
    
    event.preventDefault();
    // await this.setState({activeStep:3});
    const validationTwo = this.validatorTwo.validate(this.state);
    this.setState({ validationTwo });
    this.submittedTwo = true;
   
    const reqData = {
      first_name : this.state.fullName.split(" ")[0],
      last_name : this.state.fullName.split(" ")[1]?this.state.fullName.split(" ")[1]:this.state.fullName.split(" ")[0],
      mobile : this.state.phoneNumber,
      email : this.state.businessEmail,
      password : this.state.businessPassword,
      company: this.state.companyName
    } 
      if (validationTwo.isValid) {
        this.setState({isLoading:!this.state.isLoading})
        axios.post(`${process.env.REACT_APP_BASE_URL}/register_user/`, reqData)
        .then(res => {
          this.setState({isLoading:!this.state.isLoading,
                         successMsg:res.data.message}) 
          console.log("signupREsp",res);
          this.props.history.goBack();
        })
        .catch(error => {
          if (error.response) {
            console.error("ERR::",error);
            this.setState({isLoading:!this.state.isLoading})
            this.setState({errorMsg:error.response.data.non_field_errors[0]});
            }
        })
      }}

  storeFeildValue = (evt) => this.setState({[evt.target.name]: evt.target.value,errorMsg:''});

  getTermsAccepted = () => this.setState({termsAccepted:!this.state.termsAccepted});

  getCapsLetter = () => {
    let {businessPassword} = this.state;
    var tempLength = businessPassword.length;
    var count = 0;
    var i = 0;
    for (; i < tempLength; i++) {
      if (businessPassword.charAt(i) === businessPassword.charAt(i).toUpperCase()) {
          count++;
    }}
    if(count>0){
      return 'blue';
    }
    return 'gray';
  }

  getCharactersCount = () => {
    if(this.state.businessPassword.length>7){
      return 'blue';
    }
    return 'gray';
  }

  getFormTitle = (step) => {
   if(step==0){
     return <TitleHead head="Select" tail="Your Region"/>;
   }else if(step==1){
    return <TitleHead head="Please share following" tail="Information"/>;
   }
  }

  getOneNumber = () => {
    var matches = this.state.businessPassword.match(/\d+/g);
      if (matches != null) {
          return 'blue';
      }
    return 'gray';
  }

  showNextStep = (event) => {
    event.preventDefault();

    const validationOne = this.validatorOne.validate(this.state);
    this.setState({ validationOne });
    this.submittedOne = true;

    if (validationOne.isValid) {
      this.setState({activeStep:2});
    }}

  render(){
    var time = null;
    clearTimeout(time);
    if(this.state.successMsg){
    time = setTimeout(()=>this.setState({successMsg:''}),4000)
    }
    
    let validationOne = this.submittedOne ? this.validatorOne.validate(this.state) : this.state.validationOne;
    let validationTwo = this.submittedTwo ? this.validatorTwo.validate(this.state) : this.state.validationTwo;
    
    return (
      <div className="signup_container">
       <SnackbarComponent message={this.state.successMsg} open ={this.state.successMsg}/> 
      <div className="col-12 intro-side">
        <div className="form-inline">
        <div className="form-group col-md-6 banner-content mt-5">
        <div className="form-group">
        <h2>SETUP YOUR FREE TRIAL</h2>
        </div>
        <p>It takes just three short steps to sign up. It is free and we won’t ask you for credit card information.<br/>First, we need to know how to pre-configure the list of captured data fields - choose a region corresponding to the invoices you will be processing the most.</p>
       </div>
       </div>
       <div className="bottom-container">

        <div className="col-12 signup-side">
        <div className="col-12">
          {
            this.getFormTitle(this.state.activeStep)
          } 
        
        <div className="col-md-12 stepper-wrapper mt-3">
        
            {/* <div className="col-12 my-2"> */}
            <div className="form-group mb-4">
            </div>
            {
              this.state.activeStep===0 &&
              <div className="row justify-content-between" style={{width:'100%'}}>
             {
                invoice_types.map(item => (
                  <div className="col-sm-3 form-group invoice-choice p-3 ml-2" onClick={() => this.setState({activeStep:1})}>
                      <h6 className="mb-1">{item.title}</h6>
                      <label>{item.text}</label>
                 </div> 
               ))
             }
            </div>
            }
             

             {
               this.state.activeStep === 1 && 
                
                <form autoComplete="off" className="col-12 mt-3">
                  <div className="form-group row details_one">
                    <div className="form-group col-sm-4 px-5" >
                      <CustomInput icon={Images.input_user} type="text" maxLength="50" name="fullName" className="form-control" name="fullName" placeholder="Your name & surname" onChange={this.storeFeildValue} />
                      <a className="text-danger">{validationOne.fullName.message&&<i className="fa fa-exclamation-circle mr-1" aria-hidden="true"></i>}{validationOne.fullName.message}</a>        
                    </div>
                    <div className="form-group col-sm-4 px-5">
                      <CustomInput icon={Images.input_company} type="text" maxLength="50" name="companyName" className="form-control"  placeholder="Your Company" onChange={this.storeFeildValue} />
                      <a className="text-danger">{validationOne.companyName.message&&<i className="fa fa-exclamation-circle mr-1" aria-hidden="true"></i>}{validationOne.companyName.message}</a>
                    </div>
                    <div className="form-group col-sm-4 px-5">
                      <CustomInput icon={Images.input_phone} type="text" maxLength="10" name="phoneNumber" className="form-control" placeholder="Phone Number (Intl)" onChange={this.storeFeildValue}/>
                      <a className="text-danger">{validationOne.phoneNumber.message&&<i className="fa fa-exclamation-circle mr-1" aria-hidden="true"></i>}{validationOne.phoneNumber.message}</a>
                    </div>
                    </div>
                </form>
             }

             {this.state.activeStep === 2 && 
                  <form autoComplete="off" className="account-form">
                    <div className="form-group row details_two">
                    <div className="col-md-4"> 
                    
                    <div className="container">
                    <h6 style={{marginBottom:'15px',textAlign:'left'}}>Create<span style={{fontWeight:'600',marginLeft:'5px'}}>Your Account</span></h6>
                  <div className="form-group">
                    <CustomInput icon={Images.input_email} type="text" maxLength="50" className="form-control" name="businessEmail" placeholder="Business Email" onChange={this.storeFeildValue}/>
                    <a className="text-danger">{validationTwo.businessEmail.message&&<i className="fa fa-exclamation-circle mr-1" aria-hidden="true"></i>}{validationTwo.businessEmail.message}</a>
                  </div>
                  <div className="form-group">
                    <CustomInput isPassword={true} maxLength="16" className="form-control" name="businessPassword" placeholder="Password" onChange={this.storeFeildValue}/>
                    <a className="text-danger">{validationTwo.businessPassword.message&&<i className="fa fa-exclamation-circle mr-1" aria-hidden="true"></i>}{validationTwo.businessPassword.message}</a>
                  </div>
                  </div>
                  </div>


                  {/* <div className="d-flex justify-content-between password-verify mt-1">
                    <p><span style={{color:this.getCharactersCount()}}>⚫</span>8+ Characters</p>
                    <p><span style={{color:this.getCapsLetter()}}>⚫</span>One capital letter</p>
                    <p><span style={{color:this.getOneNumber()}}>⚫</span>One number</p>
                  </div> */}
                    {/* <div className="form-group text-danger text-center" style={{fontSize:'12px'}}>{this.state.errorMsg}</div> */}
                  <div className="col-md-4  d-flex align-items-center terms-container"> 
                  <div className="">
                  <div className="form-check mt-4">
                    <input checked={this.state.termsAccepted} type="checkbox" className="form-check-input" id="exampleCheck1" onChange={this.getTermsAccepted}/>
                    <label className="form-check-label" for="exampleCheck1">I agree with <a href="#">Extricator Terms</a></label>
                  </div>
                  <div className="form-check my-3">
                    <input type="checkbox" className="form-check-input" id="exampleCheck2"/>
                    <label className="form-check-label" for="exampleCheck2">I would like to receive news from Extricator tailored to my interests</label>
                  </div>
                  </div>
                  </div>
                  <div className="col-md-4"> 

                  <p>Extricator needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our privacy policy</p>
                  
                <div className="form-group">
                          <button disabled={!this.state.termsAccepted} type="submit" className="btn btn-lg btn-block sign-btn" onClick={this.navigateToDashboard}>{this.state.isLoading?<i className="fa fa-circle-o-notch fa-spin"></i>:"Get Started!"}</button>
                      </div>
                      </div>
                      </div>

                </form>
             }

            {/* </div> */}
            </div>
            <div className="row justify-content-center align-items-center">
            <div className="col-md-9">
            <Stepper 
        connector={<StepConnector classes={{line:this.props.classes.connector}}/>} 
        activeStep={this.state.activeStep} orientation="horizontal" className={this.props.classes.root}>
        {[1,2,3].map((index) => (
          <Step key={index} classes={{root:this.props.classes.stepRoot}}>
            <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>
      {
        this.state.activeStep ==1 &&
        <div>
            <button type="submit" className="btn btn-lg btn-block sign-btn" onClick={this.showNextStep}>Next</button>
        </div>
      }
      

            </div>
            </div>


        </div> 

        <div className="form-inline justify-content-between align-items-center hero-container">
         <div className="col-md-6 hero-text">
           GET STARTED WITH EXTRICATOR
         </div>
         <div className="col-md-4 form-inline justify-content-end">
          <img src={Images.app_logo} className="img-responsive" style={{width:'70%'}} alt=""/>
        </div>
        </div>
        
        </div>  

        </div>

          




      </div>
    );
  }

}

export default withStyles(styles)(SignUp);;
