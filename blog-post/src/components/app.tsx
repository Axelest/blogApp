import * as React from 'react';
import * as PropTypes from 'prop-types';
import {routes} from '../core/routes';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {NoMatch} from './404';

export class App extends React.Component {

     static contextTypes = {
          router: PropTypes.any.isRequired
     };

     constructor(props : any, context : any) {
          super(props, context);
     }

     render() {
          return (
               <div className="App app-general-container">
                    <Router>
                         <Switch>
                              {routes.map((route : any, key : any) => <Route exact={true} component={route.component} path={route.path} key={key}/>)}
                              <Route component={NoMatch}/>
                         </Switch>
                    </Router>
               </div>
          );
     }
}

export default App;