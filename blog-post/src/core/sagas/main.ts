import {put, takeEvery, all, select, takeLatest} from 'redux-saga/effects';
import {POSTS_FETCH, setPosts, setPostsAll, POSTS_FETCH_ALL} from '../actions/posts';
import {
     POST_ADD,
     POST_FETCH,
     POST_EDIT,
     setPost,
     POST_DELETE,
     ADD_COMMENT
} from '../actions/post';

import {
     savePost,
     getPosts,
     getPostsAll,
     getPost,
     updatePost,
     removePost,
     addCommentPost
} from '../services/api';

/** Event Watcher */
function * eventWatcher() {
     yield takeEvery(POSTS_FETCH, postFeedSet);
     yield takeEvery(POSTS_FETCH_ALL, postFeedSetAll);
     yield takeEvery(POST_ADD, postSave);
     yield takeLatest(POST_FETCH, postSet);
     yield takeLatest(POST_EDIT, editPost);
     yield takeLatest(POST_DELETE, deleteItem);
     yield takeLatest(ADD_COMMENT, addComment);

}

/** Set single post */
function * postSet() {
     const state = yield select();
     const id = yield state.rootReducer.post.id;
     const data = yield getPost(id);
     yield put(setPost(data.data));
}

/** Add Post Comment */
function * addComment() {
     const state = yield select();
     yield put(addCommentPost(state.rootReducer.post));
}

/** Edit Post */
function * editPost() {
     const state = yield select();
     yield put(updatePost(state.rootReducer.post));
}

/** Save the blog */
function * postSave() {
     const state = yield select();
     yield put(savePost(state.rootReducer.post));
}

/** Delete post */
function * deleteItem() {
     const state = yield select();
     const Id : number = yield state.rootReducer.post.id;
     put(removePost(Id));
}

/** Update posts feed */
function * postFeedSet() {
     const data = yield getPosts();
     yield put(setPosts(data.data));
}

/** Update all posts feed */
function * postFeedSetAll() {
     const data = yield getPostsAll();
     yield put(setPostsAll(data.data));
}
/** Root saga */
export function * rootSaga() {
     const sagas = [eventWatcher()];
     yield all(sagas);
}