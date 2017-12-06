import { combineEpics } from 'redux-observable';
import { getAllCategories } from './epic-category';
import epicComments from './epic-comments';
import epicPosts from './epic-posts';


export default combineEpics(
    getAllCategories,
    epicComments,
    epicPosts
);