import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';




export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime)=> {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);

    };
};

export const authFail = (error) => {
    const error_message = error
    return {
        type: actionTypes.AUTH_FAIL,
        error:error_message
    };
};


export const auth_Registration = (email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email.toLowerCase(),
            password1: password1,
            password2: password2,

        };
        let url = 'rest-auth/registration/';
        axios.post(url, authData)
            .then(response=>{
                const expirationDate = new Date(new Date().getTime()+ 3600 * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                dispatch(authFail(err.response.data));
            });
    };
};

export const auth_Signup = (email, password) => {
    return dispatch => {
        
        dispatch(authStart());
        const authData = {
            email: email.toLowerCase(),
            password: password,
        };
        let url = 'rest-auth/login/';
        axios.post(url, authData)
            .then(response=>{
                const expirationDate = new Date(new Date().getTime()+ 3600 * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.token));
                dispatch(checkAuthTimeout(3600));

            })
            .catch(err => {
                dispatch(authFail(err.response.data));
            });
    };
};





export const authCheckState = () => {
    
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const timeRemaining = expirationDate - new Date();
            if(timeRemaining <= 0){
                dispatch(logout());
            }else if (timeRemaining / 1000 <= 600){
                
                const oldToken = {
                    token: token
                };
                axios.post('refresh-token/', oldToken)
                    .then(response=>{
                        const newExpirationDate = new Date(new Date().getTime()+ 3600 * 1000);
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('expirationDate', newExpirationDate);
                        dispatch(authSuccess(response.data.token));
                        dispatch(checkAuthTimeout(3600));
                    })
                    .catch(err => {
                        dispatch(authFail(err.response.data));
                    });
            }else {
                
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime()) / 1000));
            }
            
        }
    };
};