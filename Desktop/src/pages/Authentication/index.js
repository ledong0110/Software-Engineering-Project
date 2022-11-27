import React from 'react';

import './Authentication.css';

import Login from './login/login';
import Registration from './registration/registration'

function Authentication() {

  //const [activeTab, setTabType] = useState('login');
  //const [loaderStatus, setLoaderStatus] = useState(false);

  // const changeTabType = (type) => {
  //   setTabType(type);
  // }

  // const getActiveClass = (type) => {
  //   return type === activeTab ? 'active' : '';
  // };

  // const displayPageLoader = (shouldDisplay) => {
  //   setLoaderStatus(shouldDisplay)
  // }

  return (
    <>
    <Login/>
    <Registration/>
    </>
  );
}

export default Authentication;