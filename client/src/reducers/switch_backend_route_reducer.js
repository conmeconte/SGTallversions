
import types from '../actions/types';

const DEFAULT_STATE= '';

export default function(state=DEFAULT_STATE, action){
    switch(action.type){
        case types.SWITCH_BACKEND_ROUTE:
            if(action.payload === 'php'){
                return action.payload;

            }else if(action.payload === 'node'){
                return action.payload;
            }
        default:
            return state
    }
}
