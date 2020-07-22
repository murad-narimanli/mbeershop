import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Row,
    Col
} from 'reactstrap';
const Footer = (props) => {

    const useStyles = makeStyles({
        navClass: {
            backgroundColor: '#0b3136',
            width: '100%',
            padding:'15px',
            position: 'fixed',
            bottom: "0px",
            zIndex:'2342',
            color:'white'
        },
    });

    const classes = useStyles(props);

    return (
        <div>
            <div className={classes.navClass}>
                <Container>
                    <Row>
                        <Col xs='12' md='6' className='text-md-left text-center'>Copyright © All rights reserved</Col>
                        <Col xs='12' md='6' className='mt-md-0 mt-2 d-flex justify-content-md-end justify-content-center'>Developed by <a target='_blank' href="https://github.com/murad-narimanli" className='text-success nav-link m-0 p-0 ml-2'>Murad Narimanli</a></Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Footer;