import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Route, Redirect } from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Signup from '../Signup/Signup';
import NavBar from '../NavBar/NavBar';
import Movies from '../Movies/Movies';
import Movie from '../Movie/Movie';
import Watch from '../Watch/Watch';
import FormMovies from '../FormMovie/FormMovie';

import checkToken from '../../resolvers/checkToken';

class Routes extends Component {

    render() {

        const PrivateRoute = ({
            component : Component, ...rest }) => (
                <Route {...rest} render={(props) => (
                checkToken() === true ? <Component {...props} /> : <Redirect to='/login' /> )}
                />
            )
        

        return(
            <Router>
                <main>
                    <NavBar />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />

                    <PrivateRoute exact path='/logout' component={Logout} />
                    <PrivateRoute exact path='/movies' component={Movies} />
                    <PrivateRoute exact path='/movie/:id' component={Movie} />
                    <PrivateRoute exact path='/watch/:id' component={Watch} />
                    <PrivateRoute exact path='/movies/add' component={FormMovies} />
                </main>
            </Router>
        )
    }
}

export default Routes;