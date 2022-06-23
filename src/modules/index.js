// root reducer를 만들어 모듈을 합친다. ( todos , counter )
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
