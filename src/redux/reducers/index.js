import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import blogReducer from './blog.reducers';

export default combineReducers({
  blog: blogReducer,
  auth: authReducer,
});
