import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/getUserInfo';

const composeEnhancers =process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;

const appReducer = combineReducers({
    auth:authReducer,
    user:userReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT') {
        state = undefined 
      }
    
    return appReducer(state, action)
  }

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

const app =  (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
