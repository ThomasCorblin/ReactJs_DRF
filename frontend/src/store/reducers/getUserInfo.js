import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';


const initialState = {
    email: null,
    error: null,
    loading: false,
};

const getUserInfoStart = (state, action) => {
    return updateObject(state, {error:null, loading:true});
};

const getUserInfoSuccess = (state, action) => {
    return updateObject(state, {
        email: action.email,
        error:null, 
        loading:false
    });
};

const getUserInfoFail = (state, action) => {
    return updateObject(state, {error:action.error, loading:false});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_INFO_START: return getUserInfoStart(state,action);
        case actionTypes.GET_USER_INFO_SUCCESS: return getUserInfoSuccess(state, action);
        case actionTypes.GET_USER_INFO_FAIL: return getUserInfoFail(state, action);
        default: return state;
    }
};

export default reducer;