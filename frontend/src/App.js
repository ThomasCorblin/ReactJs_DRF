import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Auth from './containers/Auth/Auth';
import Homepage from './containers/Homepage/Homepage';
import SecondPage from './containers/SecondPage/SecondPage';
import Layout from './hoc/Layout/Layout';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }


  render() {

    let routes = (
      <Switch>
        <Route path="/" exact  component={Auth}/>
        <Redirect to="/"/>
      </Switch>
    );
  

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
        <Route path="/logout" exact  component={Logout}/>
        <Route path="/home" exact component={SecondPage}/>
        <Route path="/" exact component={Homepage}/>
        <Redirect to="/"/>
      </Switch>
      );
    }
    
    
    return (
      <div>
        <Layout>
          {routes}          
        </Layout>
      </div>
    
  );
}
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () =>  dispatch(actions.authCheckState())
  };
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
