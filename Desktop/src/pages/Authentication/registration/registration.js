import React, {useState} from 'react';
import withRouter from '../../../services/withRouter';

// import { isUsernameAvailableHTTPRequest, registerHTTPRequest } from "./../../../services/api-service";
// import { setItemInLS } from "./../../../services/storage-service";

import '../login/login.scss'

function Registration() {

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Resigter</span>
        <form action="/user/login" method='POST'>
          <input type="text" placeholder="Name" name='name'/>
          <input type="text" placeholder="Picture" name='picture'/>
          <input type="text" placeholder="Username" name='username'/>
          <input type="password" placeholder="Password" name='password'/>
          <input type="text" placeholder="Role" name='role'/>
          <button type='submit'>Regis</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Registration);