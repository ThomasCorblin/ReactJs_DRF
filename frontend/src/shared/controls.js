export const controls = 
    {
        signup:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value:'',
                valdidation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value:'',
                valdidation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },
        registration: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value:'',
                valdidation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password1: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value:'',
                valdidation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            },
            password2: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Re-enter Password'
                },
                value:'',
                valdidation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },
    };