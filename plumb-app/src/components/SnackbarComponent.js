import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const SnackbarComponent = ({message,open}) => 
<Snackbar
    anchorOrigin={{ vertical:'top', horizontal:'right' }}
    open={open}
    message={message}
    key = {message[0]}/>

export default SnackbarComponent;
