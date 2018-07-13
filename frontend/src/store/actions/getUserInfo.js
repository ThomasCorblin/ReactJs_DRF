import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const getUserInfoStart = () => {
    return {
        type: actionTypes.GET_USER_INFO_START
    };
};

export const getUserInfoSuccess = (data) => {
    return {
        type: actionTypes.GET_USER_INFO_SUCCESS,
        email: data.email,
    };
};

export const getUserInfoFail = (error) => {
    const error_message = error
    return {
        type: actionTypes.GET_USER_INFO_FAIL,
        error:error_message
    };
};

export const getUserInfo = (token) => {
    return dispatch => {
        dispatch(getUserInfoStart());
        axios.defaults.headers.common['Authorization'] = 'JWT ' +token;
        axios.get('rest-auth/user/'
            ).then(res=>{
                dispatch(getUserInfoSuccess(res.data));
            })
            .catch(err => {
                dispatch(getUserInfoFail(err))
            });
    };
};