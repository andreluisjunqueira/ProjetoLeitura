import { SET_USER } from '../actions/types';

 export const user = (state=null, action)=>{
    if(action.type == SET_USER){
        return action.user;
    }
    return state;
}