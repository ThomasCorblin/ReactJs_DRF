import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
   
class Homepage extends Component {


    componentDidMount(){
        this.props.getUserInfo(this.props.token);

    }

    render () {
        //this.props.onTryAutoSignUp();

        return (
            <div>
                <p>Token: {this.props.token}</p>
                <p>Email: {this.props.email}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated : state.auth.token !== null,
      token: state.auth.token,
      email: state.user.email,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        getUserInfo : (token) => dispatch(actions.getUserInfo(token)), 
        onTryAutoSignUp: () =>  dispatch(actions.authCheckState())
    };
  };
  
    
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);