 import {combineReducers} from 'redux';

 const favoritList  = (state=[],action) => {

    function canAdd (id) {
        let status = true;
        state.forEach(e => {
            if(e.id === id) {
                status = false;
            }
        });
        return status;
    }
    switch(action.type) {
        case 'ADD_FAV' : 
            if(canAdd(action.payload.id)) {
                state = state.concat(action.payload);
            }
            break;
        case 'DELETE_FAV' : 
            state = state.slice();
            state = state.filter((v) => {return v.id !== action.payload});
            console.log(state);
            break;
    }

    return state;
 },
 reducers = combineReducers({
     tasks: favoritList
 });

 export default reducers;