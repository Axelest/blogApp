import {IPost} from '../models/post';

/** Action Types */
export const POST_FETCH = 'POST_FETCH';
export const POST_FETCH_DONE = 'POST_FETCH_DONE';
export const POST_FETCH_ERROR = 'POST_FETCH_ERROR';
export const POST_ADD = 'POST_ADD';
export const POST_EDIT = 'POST_EDIT';
export const POST_DELETE = 'POST_DELETE';
export const ADD_COMMENT = 'ADD_COMMENT';

/** Action Handlers */
export const getPost = (id : number) => ({type: POST_FETCH, payload: id});
export const setPost = (post : IPost) => ({type: POST_FETCH_DONE, payload: post});
export const editPost = (post : IPost) => ({type: POST_EDIT, payload: post});
export const deletePost = (id : number) => ({type: POST_DELETE, payload: id});
export const addPost = (data : any) => ({type: POST_ADD, payload: data});
export const addComment = (data : any) => ({type: ADD_COMMENT, payload: data});