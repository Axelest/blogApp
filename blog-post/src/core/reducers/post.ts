import {
     POST_FETCH,
     POST_FETCH_DONE,
     POST_ADD,
     POST_EDIT,
     POST_DELETE,
     ADD_COMMENT
} from '../actions/post';
import {IPost} from '../models/post';

/** Dummy post object */
const initState = () : IPost => ({
     id: 0,
     title: '',
     content: '',
     createdDate: '',
     updatedDate: '',
     media: '',
     status: '',
     comments: []
});

/** Post Reducer */
export const postReducer = (state = initState(), action : any) => {
     switch (action.type) {
          case POST_FETCH:
               return {
                    ...state,
                    id: action.payload
               }
          case POST_FETCH_DONE:
               return {
                    ...state,
                    ...action.payload
               }
          case POST_ADD:
               return {
                    ...state,
                    ...action.payload
               }
          case POST_EDIT:
               return {
                    ...state,
                    ...action.payload
               }
          case POST_DELETE:
               return {
                    ...state,
                    id: action.payload
               }
          case ADD_COMMENT:
               return {
                    ...state,
                    ...action.payload
               }
          default:
               return state;
     }
}