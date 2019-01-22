import {combineReducers} from 'redux';
import {IStoreState} from '../models/store';
import {postReducer} from './post';
import {postsReducer} from './posts';

/** Root Reducer */
export const rootReducer = combineReducers < IStoreState > ({post: postReducer, posts: postsReducer});