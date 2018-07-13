import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';


const authForm = (props) => {


    let form = props.elementArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => props.onChange(event, formElement.id, props.isSignup)}
            shouldValidate={formElement.config.valdidation}
            touched={formElement.config.touched}
            invalid={!formElement.config.valid}
            />
        
    ));

    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <p>{props.name}</p>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
        </div>
    );
};
    
export default authForm;