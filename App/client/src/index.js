import React from 'react';
import ReactDOM from 'react-dom';
import 'rxjs';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './observable/epics';

const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(rootReducer,applyMiddleware(epicMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
