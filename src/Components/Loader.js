import React from 'react';
import {FadeLoader} from "react-spinners";
import {Container} from "reactstrap";
import {makeStyles} from "@material-ui/core/styles";

function Loader(props) {
    const useStyles = makeStyles({
        contstyle: {
            display:'flex',
            justifyContent:'center',
            position : "absolute",
            top:'50%'
        }
    });

    const classes = useStyles(props);

    return (
        <Container className={classes.contstyle}>
            <FadeLoader color='darkGreen'/>
        </Container>
    );
}


export default Loader;
