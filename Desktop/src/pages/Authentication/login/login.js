import React, {useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from '../../../api/axios';

import withRouter from '../../../services/withRouter';
import useAuth from '../../../hooks/useAuth';
// import { loginHTTPRequest } from "./../../../services/api-service";
// import { setItemInLS } from "./../../../services/storage-service";

import './login.scss'

const LOGIN_URL = '/login'

function Login(props) {
  
  const { auth, setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/task"

  const [errMsg, setErrMsg] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState(false)
  
  useEffect(() =>{
    if (auth?.accessToken) 
      navigate(from, { replace: true})
  })
  
  useEffect(() => {
    setErrMsg("")
  }, [username, password])

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try {
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify({username, password}),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        })
        
        const accessToken = response?.data?.accessToken
        const expire = response?.data?.exp
        const user = response?.data?.user
        setAuth({ ...user, accessToken, expire }) 
        console.log(auth)
        setUsername('')
        setPassword('')
        navigate(from, { replace: true})
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.reponse?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else if (err.response?.status === 403) {
        setErrMsg('Your username or password is Wrong')
      } else {
        setErrMsg('Login failed')
      }
      setState(true)
    }
  }
  
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Login</span>
      {state && (<p style={{color : "red"}}>{errMsg}</p>)}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="username" name='username' onChange={e => setUsername(e.target.value)} value={username} required />
          <input type="password" placeholder="password" name='password' onChange={e => setPassword(e.target.value)} value={password} required/>
          <button type='submit' >Sign in</button>
        </form>
        {/* <p>You don't have an account? <Link to="/user/insert" style={{color: 'rgba(11, 204, 148, 0.35)'}}>Register</Link></p> */}
      </div>
    </div>
    
  );
}

export default withRouter(Login);