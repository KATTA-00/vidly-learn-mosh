import React, { Component } from 'react';
import Form from "./form"
import Joi from 'joi-browser';

class RegisterForm extends Form {
    state = {
        data: { username: '', password: '', name: '' },
        errors: {}
    };

    schema = {
        name: Joi.string().min(3).required(),
        password: Joi.string().min(8).required(),
        username: Joi.string().email().required()
    };

    doSubmit = () => {
        console.log("Submit");
    }


    render() {
        return (
            <div>
                <h1>RegisterFrom</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInputs('username', 'Username')}
                    {this.renderInputs('password', 'Password', 'password')}
                    {this.renderInputs('name', 'Name')}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;