import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context';
import routes from './config/routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {



  return (

    <AuthProvider>
      <ToastContainer
        position="top-center"
        hideProgressBar
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <Router>

        <Switch>
          {routes.map((route) => (
            route.exact===true?(<PrivateRoute
            key={route.path}
            path={route.path}
            isPrivate={route.isPrivate}
            component={route.component}
            exact
          />):
          (<PrivateRoute
              key={route.path}
              path={route.path}
              isPrivate={route.isPrivate}
              component={route.component}
             
            />)
          ))}
          
        </Switch>

      </Router>


    </AuthProvider>


  );
}

export default App;
