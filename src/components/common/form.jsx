import React, { Component } from 'react'
import Joi from 'joi-browser';
import Input from './input';
import Select from './selecte';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const { error } = Joi.validate(this.state.data, this.schema, { abortEarly: false });

        if (!error) return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;

        return errors;

        // const errors = {};

        // const { data } = this.state;

        // if (data.username.trim() === '')
        //     errors.username = 'username requied!';
        // if (data.password.trim() === '')
        //     errors.password = 'password requied!';


        // return Object.keys(errors).length === 0 ? null : errors;
    }


    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        if (!error) return null;
        return error.details[0].message;

        // if (name === 'username') {
        //     if (value.trim() === '') return 'username requied!';
        // }
        // if (name === 'password') {
        //     if (value.trim() === '') return 'password requied!';
        // }
    }


    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;

        this.setState({ data, errors });
    }

    renderButton(label) {
        return (<button disabled={this.validate()} className="btn btn-primary">{label}</button>);
    }

    renderInputs(name, label, type = 'text') {
        const { data, errors } = this.state;
        return (
            <Input type={type} error={errors[name]} name={name} value={data[name]} label={label} onChange={this.handleChange} />
        );
    }

    renderSelect(name, label, options) {
        const { data, errors } = this.state;

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />

        );
    }

}

export default Form;