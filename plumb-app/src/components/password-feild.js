import React,{useState} from 'react';

const PasswordFeild = ({fetchValue,...others}) => {

const [isVisible,setVisible] = useState(false);

return(
<div className="form-inline" style={{border: '1px solid gray',borderRadius:'10px'}}>
<input {...others} type={isVisible?"text":"password"} style={{border:"none",width:'87%',borderRadius:'10px 0 0 8px',marginRight:'9px'}} className="form-control" />
<span onClick={()=>setVisible(!isVisible)} style={{cursor:'pointer'}}>
{
  !isVisible?<i className="fa fa-eye" aria-hidden="true"></i>:
  <i className="fa fa-eye-slash" aria-hidden="true"></i>
}
</span>
</div>
)}

export default PasswordFeild;