import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import withRouter from '../../../services/withRouter';

// import { loginHTTPRequest } from "./../../../services/api-service";
// import { setItemInLS } from "./../../../services/storage-service";

import './login.scss'

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState(false)
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/task")
  }
  })
  const navigate = useNavigate()
  function login() {
    fetch('http://127.0.0.1:8000/login', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    body: JSON.stringify({"username": username, "password": password}),
    headers: {
    'Content-Type': 'application/json'
    },
    })
    .then((response) => response.json())
    .then((data) => {
      
      if (data.msg === 'done') {
        localStorage.setItem('token', data.token)
        navigate('/task')
      }
      else {
        setState(true)
      }
    })
  }
  
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Login</span>
      {state && (<p style={{color : "red"}}>Login failed</p>)}
        <form>
          <input type="text" placeholder="username" name='username' onChange={e => setUsername(e.target.value)}/>
          <input type="password" placeholder="password" name='password' onChange={e => setPassword(e.target.value)}/>
          <button type='submit' onClick={e => {e.preventDefault(); login()}}>Sign in</button>
        </form>
        <p>You don't have an account? <Link to="/user/insert" style={{color: 'rgba(11, 204, 148, 0.35)'}}>Register</Link></p>
      </div>
    </div>
    
  );
}

export default withRouter(Login);