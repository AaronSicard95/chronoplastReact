import { getLocalAdmin, getLocalUser } from "./localStorage";

const INITIAL_STATE = {user:getLocalUser(), admin: getLocalAdmin()};

function userReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case 'CHANGE':
            return {...state, user:action.payload};
        case 'ADMIN':
            return {...state, admin:action.payload};
        default:
            return state
    }
}

export default userReducer;