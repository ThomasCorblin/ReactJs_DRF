import React, {Component} from 'react';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject, checkValidity} from '../../shared/utility';
import {controls} from '../../shared/controls';
import Form from '../../components/UI/Form/Form';
    
class Auth extends Component {
    state= {
        signup: {...controls.signup},
        registration: {...controls.registration}
    };
    inputChangedHandler = (event, controlName,isSignup) =>{
        let state = isSignup ? this.state.signup : this.state.registration;
        const updatedControls = updateObject( state, { 
                [controlName]: updateObject(state[controlName], {
                    value: event.target.value,
                    valid:checkValidity(event.target.value, state[controlName].valdidation),
                    touched: true 
                })          
        }) ;
        this.setState(isSignup ? {signup: updatedControls}: {registration: updatedControls});      
    };
    submitHandlerRegistration = (event) => {
        event.preventDefault();
        this.props.onAuthRegistration(this.state.registration.email.value, this.state.registration.password1.value, this.state.registration.password2.value);
    };
    submitHandlerSignup = (event) => {
        event.preventDefault();
        this.props.onAuthSignup(this.state.signup.email.value, this.state.signup.password.value);
    };

    formElementsArray = (state) => {
        const formElementsArray = [];
        for (let key in state){
            formElementsArray.push({
                id:key,
                config:state[key]
            });
        }
        return formElementsArray;
    };


    render () {
        
        const registrationElementArray = this.formElementsArray(this.state.registration);
        const signupElementArray = this.formElementsArray(this.state.signup);


        if(this.props.loading){
            //formRegistration = <Spinner/>;
            //formSignup = <Spinner/>;
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage=(
                <p>{this.props.error.message}</p>
            );
        }
        return (
            <div>
                <div className={classes.Auth}>
                    <Form 
                        name="REGISTRATION"
                        onSubmit={this.submitHandlerRegistration}
                        elementArray={registrationElementArray}
                        onChange={this.inputChangedHandler}
                        isSignup = {false}
                    />                    
                </div>
                <div className={classes.Auth}>
                    <Form 
                        name="SIGNUP"
                        onSubmit={this.submitHandlerSignup}
                        elementArray={signupElementArray}
                        onChange={this.inputChangedHandler}
                        isSignup = {true}
                    />         
                </div>  
            </div>
        );
    }
}
    
const mapStateToProps = state =>{
    return {
        loading : state.auth.loading,
        error: state.auth.error,
        isAuthenticated : state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthRegistration: (email, password1,password2) => dispatch(actions.auth_Registration(email, password1,password2)),
        onAuthSignup: (email, password) => dispatch(actions.auth_Signup(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);