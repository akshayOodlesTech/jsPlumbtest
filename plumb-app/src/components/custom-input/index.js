import React,{useState} from 'react';
import './customInput.module.scss';
import Images from '../../assets/asset_imports';

const CustomInput = ({isPassword,icon,...others}) => {

const [isVisible,setVisible] = useState(false);
return(
  <>
  {
    isPassword?
    <div className="form-inline wrapper pl-2">
    <div className="col-sm-1 icon-wrapper">    
    {/* <i className='fa fa-lock' aria-hidden="true"></i> */}
    <img src={Images.input_lock}/>
    </div>
    <div className="col-sm-11 password-wrapper pl-2">
    <input {...others} type={isVisible?"text":"password"}/>
        <span onClick={()=>setVisible(!isVisible)} style={{cursor:'pointer'}}>
          {
          !isVisible?<i className="fa fa-eye" aria-hidden="true"></i>:
          <i className="fa fa-eye-slash" aria-hidden="true"></i>
          }
        </span>
    </div>
    </div>:

      <div className="form-inline wrapper pl-2">
      <div className="col-sm-1 icon-wrapper">    
      {/* <i className={iconClass} aria-hidden="true"></i> */}
      <img src={icon}/>
      </div>
      <div className="col-sm-11 text-wrapper pl-2">
      <input {...others}/>
      </div>
      </div>

  }

</>
)}

export default CustomInput;