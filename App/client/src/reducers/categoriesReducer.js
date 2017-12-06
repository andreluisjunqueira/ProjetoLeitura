import {CATEGORIES } from '../actions/types';

export default (state=[], action)=>{
    switch(action.type){
        case CATEGORIES:
            return action.categories;
        default : 
            return state;
    }
}