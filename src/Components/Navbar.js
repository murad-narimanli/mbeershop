import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
} from 'reactstrap';
import { NavLink } from 'react-router-dom'
const Navs = (props) => {

    const useStyles = makeStyles({
        navClass: {
            backgroundColor: '#0b3136',
            width: '100%',
            position: 'fixed',
            top: "0px",
            zIndex:'2342'
        },
    });

    const classes = useStyles(props);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className={classes.navClass}>
            <Container>
                <Navbar  dark  expand="md">
                    <NavbarBrand style={{color: "LightGreen"}} href="/">M-beerShop</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className='nav-link' exact to='/' >Home</NavLink>
                            </NavItem>
                            {/*<NavItem>*/}
                            {/*    <NavLink className='nav-link' to='/signin' >Sign In</NavLink>*/}
                            {/*</NavItem>*/}
                            {/*<NavItem>*/}
                            {/*    <NavLink className='nav-link'  to='/signup'>Sign Up</NavLink>*/}
                            {/*</NavItem>*/}
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        </div>
    );
}

export default Navs;