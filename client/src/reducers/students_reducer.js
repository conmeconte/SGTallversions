
import types from '../actions/types';

const DEFAULT_STATE={
    list : [],
    average: null
}

export default function(state=DEFAULT_STATE, action){
    switch(action.type){
        case types.GET_STUDENTS:
            const data = action.payload.data.data;
            const average = data.reduce((total, list)=> total + parseInt(list.grade), 0) / data.length;

            return {list: data, average: Math.round(average)}
        default:
            return state;
    }
}
