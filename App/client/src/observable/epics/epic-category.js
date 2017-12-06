
import requestApi from '../../utils/requestApi';
import { GET_ALL_CATEGORIES, CATEGORIES } from '../../actions/types';


export const getAllCategories = (action$, store)=>action$.ofType(GET_ALL_CATEGORIES)
                                                    .mergeMap(requestApi.categories.getAll)
                                                    .map((data)=>({type:CATEGORIES, categories: data.categories }))