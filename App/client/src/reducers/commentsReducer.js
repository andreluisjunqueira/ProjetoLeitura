import { COMMENTS} from '../actions/types';

const INITIAL_STATE = {
    comments : []
}

export const comments = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case COMMENTS :
            return action.comments
        default :
            return state;
    }
}


