import { combineReducers } from 'redux';
import cellsReducers from './cells-reducers';

const reducers = combineReducers({
    cells: cellsReducers
});

export default reducers;

export type RootState = ReturnType<typeof reducers>; 
