import {IPosts} from '../models/posts';
/** Action Types */
export const POSTS_FETCH = 'POSTS_FETCH';
export const POSTS_FETCH_ALL = 'POSTS_FETCH_ALL';
export const POSTS_FETCH_ALL_DONE = 'POSTS_FETCH_ALL_DONE';
export const POSTS_FETCH_DONE = 'POSTS_FETCH_DONE';
export const POSTS_FETCH_ERROR = 'POSTS_FETCH_ERROR';

/** Action Handlers */
export const getPosts = () => ({type: POSTS_FETCH});
export const setPosts = (posts : IPosts) => ({type: POSTS_FETCH_DONE, payload: posts});
export const getAll = () => ({type: POSTS_FETCH_ALL});
export const setPostsAll = (posts : IPosts) => ({type: POSTS_FETCH_ALL_DONE, payload: posts});