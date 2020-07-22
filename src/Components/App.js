import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Strapi from "strapi-sdk-javascript/build/main";
import Loader from "./Loader";
const apiurl = process.env.API_URL || 'https://adminpanel-m.herokuapp.com';
const strapi = new Strapi(apiurl);
class App extends Component {
  state = {
    brands: [ ],
    searchTerm : '',
    isLoading : true
  }
  async componentDidMount(){
   try {
     const response = await strapi.request('POST' , '/graphql' ,{
       data:{
         query:`query {
                brands{
                  _id 
                  name
                  description
                  createdAt
                  image{
                    url
                  }
                }
              }`
       }
     } );
     this.setState({brands: response.data.brands || [] })
       console.log(response.data.brands)
     this.setState({isLoading: false})
   }catch (err) {
      console.error(err)
       this.setState({isLoading: true})
   }
  }

   handleChange = (e) =>{
        this.setState({searchTerm : e.target.value })
       console.log(this.state.searchTerm)
    }

    filteredbrands = ({searchTerm, brands}) => {
        return brands.filter(brand => {
            return brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                brand.description.toLowerCase().includes(searchTerm.toLowerCase())
        } );
    }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="App">
        <Container className='mt-5'>

           <div  className='d-flex justify-content-center'>
               <TextField
                   className='w-75'
                   label="Search Brands"
                   margin="normal"
                   variant="outlined"
                   size="small"
                   onChange={this.handleChange}
               />
           </div>
          <Row className='d-flex justify-content-center align-items-center'>
              { isLoading ?  '' : <Col xs='12' className='d-flex mt-3 justify-content-center align-items-center'><h3>Brands</h3></Col>  }
            {
                this.filteredbrands(this.state).map(brand => (
                  <Col key={brand._id} className='p-3' xs="12" sm="6" md="4">
                      <Link to={`/${brand._id}`} className='nav-link text-dark p-0'>
                          <Card>
                              <CardImg top width="100%" src={`${apiurl}${brand.image.url}`} />
                              <CardBody>
                                  <CardTitle>{brand.name}</CardTitle>
                                  <CardText>{brand.description}</CardText>
                                  <CardText>See brews <ArrowRightAltIcon/> </CardText>
                              </CardBody>
                          </Card>
                      </Link>
                  </Col>

              ))
            }
          </Row>
            { isLoading ?  <Loader /> : ''  }
        </Container>
      </div>
    );
  }
}

export default App;
