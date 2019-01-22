import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {history, store} from './core/stores/main';
import './styles/main.scss';

/** Import components */
import AppContainer from './components/app.container';

/** Render the app */
ReactDOM.render(
  <Provider store={store}>
  <ConnectedRouter history={history}>
    <AppContainer/>
  </ConnectedRouter>
</Provider>, document.getElementById('root')as HTMLElement);
registerServiceWorker();
