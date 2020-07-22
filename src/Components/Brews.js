import React, {Component} from 'react';
import Strapi from "strapi-sdk-javascript/build/main";
import Loader from "./Loader";
import {Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row} from "reactstrap";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {CaculatePrice, setCart , getCart } from '../utils/index'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const apiurl = process.env.API_URL || 'https://adminpanel-m.herokuapp.com';
const strapi = new Strapi(apiurl);

class Brews extends Component {
    state = {
        isLoading: true,
        brews: [ ] ,
        brand:'',
        cartItems:[]
    };

    async componentDidMount(){
        console.log(this.props.match.params.brandId)
        try {
            const response = await strapi.request('POST' , '/graphql' ,{
                data:{
                    query:`query {
                            brand(id:"${this.props.match.params.brandId}"){
                                _id
                                name
                                brews{
                                  _id
                                  name
                                  imaage{
                                    url
                                  }
                                  price
                                  description
                                }
                              }
                            }`
                }
            } );
            this.setState({
                brews : response.data.brand.brews,
                brand : response.data.brand.name,
                isLoading: false,
                cartItems : getCart()
            })
        }catch (err) {
            console.error(err)
            this.setState({isLoading: true})
        }


    }

    addToCart = brew => {
        const  allReadyInCart = this.state.cartItems.findIndex(item => item._id === brew._id) ;
        if(allReadyInCart === -1 ){
            const updatedItems = this.state.cartItems.concat({
                ...brew,
                quantity : 1
            })
            this.setState({cartItems: updatedItems} , ()=> setCart(updatedItems))
        }
        else {
            const  updatedItems = [...this.state.cartItems]
            updatedItems[allReadyInCart].quantity += 1
            this.setState({cartItems: updatedItems}, ()=> setCart(updatedItems))
        }
    }

    deleteItemFromCart = deletedItemId =>{
        const filteredItems  =  this.state.cartItems.filter(
            item => item._id !== deletedItemId
        )
        this.setState({cartItems: filteredItems} , ()=> setCart(filteredItems))
    }

    render() {
        const { brand , brews ,isLoading,cartItems } = this.state
        return (
            <div>
                <Container className='mt-5'>
                   <Row>
                       <Col md="12" lg="8"  className='order-lg-1 order-2 mt-4 mt-lg-0'>
                               <Row className='d-flex justify-content-center align-items-center'>
                               { isLoading ?  '' : <Col xs='12' className='d-flex justify-content-center align-items-center'><h3>{brand}'s brews</h3></Col>  }
                               {
                                   brews.map(brew => (
                                       <Col key={brew._id} className='p-3' xs="12" sm="6" md="6">
                                           <Card>
                                               <CardImg top width="100%" src={`${apiurl}${brew.imaage.url}`} />
                                               <CardBody>
                                                   <CardTitle>{brew.name}</CardTitle>
                                                   <CardText>{brew.description}</CardText>
                                                   <CardTitle>Price: ${brew.price}</CardTitle>
                                                   <Button  size="small" onClick={() => this.addToCart(brew)}  variant="contained"  color="primary" className='font-weight-bold'><ShoppingBasketIcon className='mr-2' /> add to card</Button>
                                               </CardBody>
                                           </Card>
                                       </Col>

                                   ))
                               }
                           </Row>
                       </Col>

                        { isLoading ? '' :
                            <Col  md="12" lg="4" className='px-3 order-lg-2 order-1'>
                                <div  className='d-flex pb-3 justify-content-center align-items-center'><h3>Your cart</h3></div>
                                <Paper  variant="outlined" >
                                    <CardContent>
                                        <Typography  color="textSecondary" className='text-center mt-2' gutterBottom>
                                            {cartItems.length} items added to cart
                                        </Typography>
                                        {
                                            cartItems.length === 0 && (
                                                <Typography className='text-center mt-2'>
                                                    Please add to cart something
                                                </Typography>
                                            )
                                        }

                                        {/*table*/}
                                        {
                                            cartItems.length !== 0 && (
                                                <TableContainer component={Paper}>
                                                    <Table aria-label="caption table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Name</TableCell>
                                                                <TableCell align="right">Price</TableCell>
                                                                <TableCell align="right"></TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {cartItems.map(item => (
                                                                <TableRow key={item._id}>
                                                                    <TableCell component="th" scope="row">
                                                                        {item.name} x {item.quantity}
                                                                    </TableCell>
                                                                    <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                                                                    <TableCell align="right">
                                                                        <IconButton  size="medium" onClick={() => this.deleteItemFromCart(item._id)} >
                                                                            <DeleteIcon/>
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            )
                                        }

                                        {/*table*/}

                                    </CardContent>
                                    <Typography color="textSecondary" component='h2' className='mt-2 mb-2 text-center' variant='h5'>
                                        Total price : {CaculatePrice(cartItems)}
                                    </Typography>
                                    {/*<CardActions className='text-center d-flex justify-content-center'>*/}
                                    {/*    <Link to='/checkout' className="nav-link  p-2" >*/}
                                    {/*        <Button size="small" variant="contained"  color="primary" className='font-weight-bold'>CheckOut</Button>*/}
                                    {/*    </Link>*/}
                                    {/*</CardActions>*/}
                                </Paper>
                            </Col>
                        }
                   </Row>
                    { isLoading ?  <Loader /> : ''  }
                </Container>
            </div>
        );
    }
}

export default Brews;
