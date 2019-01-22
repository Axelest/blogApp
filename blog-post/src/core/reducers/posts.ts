import {POSTS_FETCH_DONE, POSTS_FETCH_ERROR, POSTS_FETCH_ALL_DONE} from '../actions/posts';
import {IPosts} from '../models/posts';

/** Init default state */
const initState = () : IPosts => ({data: []});

/** Posts Reducer */
export const postsReducer = (state = initState(), action : any) => {
     switch (action.type) {
          case POSTS_FETCH_DONE:
               return {
                    ...state,
                    ...action.payload
               }
          case POSTS_FETCH_ALL_DONE:
               return {
                    ...state,
                    ...action.payload
               }
          case POSTS_FETCH_ERROR:
               return state;
          default:
               return state;
     }
};