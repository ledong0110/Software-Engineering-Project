import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {publicRoutes} from './routes/index'
import DefaultLayout from './components/Layout/DefaultLayout';
import { Fragment } from 'react';
import { IsAuthenticated } from './middlewares/IsAuthenticated';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component

            let Layout = Fragment

            if (!route.layout) Layout = DefaultLayout

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <IsAuthenticated required={route.private}>
                    <Layout>
                      <Page/>
                    </Layout>
                  </IsAuthenticated>
                  }
                onEnter={route.onEnter}
              />
            )
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
