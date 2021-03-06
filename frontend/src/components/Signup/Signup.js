import React, { Component } from 'react';
import signup from '../../services/signup';

class Signup extends Component {

    state = {
        name           : '',
        lastName       : '',
        email          : '',
        password       : '',
        check_password : '',
        birthDate      : '',
        phone          : ''
    }

    validatePasswords(password, passwordToVerify) {
        if (password === passwordToVerify) {
            return true;
        } else {
            alert("Passwords don't match");
            return false;
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        if (this.validatePasswords(this.state.password, this.state.check_password)) {
            signup(this.state).then((response) => {
                console.log(response.data)
                this.props.history.push('/login')
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    onInputCheck = (event) => {
        let name  = event.target.name;
        let value = event.target.value;

        this.setState({
            [name] : value
        })
    }

    render(){
        return(
                <div className="container">
                    <div className="row justify-content-center centered-form">
                        <div className="col-xs-12 col-sm-8 col-md-10 col-sm-offset-2 col-md-offset-4">
                            <div className="panel panel-default container">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Please sign up for Netflix</h3>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={this.onFormSubmit}>
                                        <div className="row">

                                            <div className="col-xs-6 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="text" name="name" className="form-control input-sm" placeholder="First Name" value={this.state.name} onChange={this.onInputCheck} />
                                                </div>
                                            </div>

                                            <div className="col-xs-6 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="text" name="lastName" className="form-control input-sm" placeholder="Last Name" value={this.state.lastName} onChange={this.onInputCheck} />
                                                </div>
                                            </div>

                                            <div className="col-xs-6 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="date" name="birthDate" className="form-control input-sm" placeholder="dd/mm/aaaa" value={this.state.birthDate} onChange={this.onInputCheck} />
                                                </div>
                                            </div>

                                            <div className="col-xs-6 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="text" name="phone" className="form-control input-sm" placeholder="Phone Number" value={this.state.phone} onChange={this.onInputCheck} />
                                                </div>
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <input type="text" name="email" className="form-control input-sm" placeholder="E-mail" value={this.state.email} onChange={this.onInputCheck} />
                                                </div>
                                            </div>
                                                
                                            
                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <input type="password" id="password" name="password" className="form-control input-sm" placeholder="Password" value={this.state.password} onChange={this.onInputCheck} />
                                                </div>
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <input type="password" id="check_password" name="check_password" className="form-control input-sm" placeholder="Confirm Password" value={this.state.check_password} onChange={this.onInputCheck} />
                                                </div>
                                            </div>
                                        
                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <input type="submit" value="Register" className="btn btn-info btb-block" />
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}

export default Signup;