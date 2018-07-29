import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import appReducer from './reducer/appReducer';

var logger = createLogger({
    collapsed : true
});

const configureStore = () => 
    createStore(
    appReducer, 
    applyMiddleware(logger)
    );

export default configureStore;