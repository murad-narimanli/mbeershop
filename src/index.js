import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router , Switch , Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './Components/App';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Checkout from './Components/Checkout';
import Brews from './Components/Brews';
import Footer from './Components/Footer';
import Error from './Components/Error';
import registerServiceWorker from './registerServiceWorker';
import Navbar from './Components/Navbar'
import HeadImg from './Components/HeadImg'
import './index.css';

const Root = () =>(

        <Router>
            <React.Fragment>
                <Navbar/>
                <HeadImg/>
                <Switch>
                    <Route path={'/'} exact component={App}/>
                    <Route path={'/signin'} exact component={SignIn}/>
                    <Route path={'/signup'} exact component={SignUp}/>
                    <Route path={'/checkout'}  exact component={Checkout}/>
                    <Route path={'/:brandId'}  exact component={Brews}/>
                    <Route  component={Error}/>
                </Switch>
                <div className='py-5 my-2'></div>
                <Footer/>
            </React.Fragment>
        </Router>

)



ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
