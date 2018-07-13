import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
   
class SecondPage extends Component {


        

    render () {
      //this.props.onTryAutoSignUp();
        return (
            <div>
                byebye
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
  
    
export default connect(mapStateToProps, mapDispatchToProps)(SecondPage);