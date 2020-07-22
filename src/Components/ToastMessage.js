import React from 'react';
import Alert from "@material-ui/lab/Alert";

function ToastMessage({message , show }) {
    return (
      show &&  <Alert variant='outlined'  className='mt-4' severity="error">{message}</Alert>
    );
}


export default ToastMessage;
