import React, { useEffect } from 'react';
import './showcase.module.scss';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { fetchAuthToken } from '../../utils/Helpers';

const ImageShowcase = ({fileId,handleClose}) => {

    const [isLoading, setLoading] = React.useState(false);
    const [authToken, setAuthToken] =  React.useState('');
    const [preview, setPreview] =  React.useState('');


    const fetchFileImage = () => {
    setLoading(!isLoading);
    const reqData = {
        file_id : fileId
    }
    axios({ method: 'post',url:`${process.env.REACT_APP_BASE_URL}/doc_preview/`,data: reqData ,headers: {'Authorization': `Bearer ${authToken}`}})
    .then(res => {
        console.log("PREIVEWRESP::"+JSON.stringify(res));
        setLoading(!isLoading);
        const img = res.data.encoded_string;
        var tempArr = img.split("/");
        tempArr = tempArr.splice(3,tempArr.length);
        let previewImg = `${process.env.REACT_APP_BASE_URL}/${tempArr.join("/")}`;
        console.warn("newImge---",previewImg)
        setPreview(previewImg)
    })
    .catch(error => {
        if (error.response) {
        console.error("DOCERR::",error.response);
        }
        setLoading(!isLoading);
    })}

    useEffect(()=>{
    var auth = fetchAuthToken();
    setAuthToken(auth);
    },[])

useEffect(() => {
    fetchFileImage();
},[authToken])

    return(
        <div id="myNav" className="overlay">
        <a href="#" className="closebtn" onClick={handleClose}>&times;</a>
        {
            isLoading ?
            <div className="overlay-content">
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>:
            <div style={{marginTop:'30px'}}>
                <img src={preview} className="img-fluid" alt="Responsive image"></img>
            </div>
        }
        
        </div>
    )
}

export default ImageShowcase;