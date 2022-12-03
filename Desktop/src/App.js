import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {publicRoutes, privateRoutes} from './routes/index'
import DefaultLayout from './components/Layout/DefaultLayout';
import { Fragment } from 'react';
import RequireAuth  from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Authentication from './pages/Authentication'

const ROLES = {
  "backofficer": 0,
  "employee": 1
}

function App() {

  return (
    <Router>
      <div>
        <Routes> 
          
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Authentication />}></Route>
          {/* private route */}
            <Route element={<RequireAuth allowedRoles={[ROLES.backofficer]}/>}>
              {privateRoutes.map((route, index) => {
                const Page = route.component

                let Layout = Fragment

                if (!route.layout) Layout = DefaultLayout

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      
                        <Layout>
                          <Page/>
                        </Layout>
                
                      }
                  
                  />
                )
              })}
            </Route>
          </Route>
          {/* Public route */}
          {publicRoutes.map((route, index) => {
            const Page = route.component

            let Layout = Fragment

            if (!route.layout) Layout = DefaultLayout

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  
                    <Layout>
                      <Page/>
                    </Layout>
             
                  }
                
              />
            )
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
