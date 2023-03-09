import React, { Component } from 'react';
import Input from './input';
import Joi from 'joi-browser';
import Form from './form'

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {

        }
    }

    // username = React.createRef();
    // componentDidMount() {
    //     this.username.current.focus();
    // }

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required()
    };

    doSubmit = () => {
        //call the server
    }


    render() {

        return (
            <div>
                <h1>LoginForm</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInputs('username', 'Username')}
                    {this.renderInputs('password', 'Password', 'password')}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;