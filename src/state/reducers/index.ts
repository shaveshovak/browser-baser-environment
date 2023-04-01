import { combineReducers } from 'redux';
import cellsReducers from './cells-reducers';
import bundlesReducer from './bundlesReducer';

const reducers = combineReducers({
    cells: cellsReducers,
    bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>; 
