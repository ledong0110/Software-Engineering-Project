import React from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../../../services/withRouter';

// import { loginHTTPRequest } from "./../../../services/api-service";
// import { setItemInLS } from "./../../../services/storage-service";

import './login.scss'

function Login(props) {

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Login</span>
        <form action="/login" method='POST'>
          <input type="text" placeholder="username" name='username'/>
          <input type="password" placeholder="password" name='password'/>
          <button type='submit'>Sign in</button>
        </form>
        <p>You don't have an account? <Link to="/user/insert" style={{color: 'rgba(11, 204, 148, 0.35)'}}>Register</Link></p>
      </div>
    </div>
    
  );
}

export default withRouter(Login);