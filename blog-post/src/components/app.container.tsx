import {connect} from 'react-redux';
import {IStoreState} from '../core/models/store';
import {getPosts} from '../core/actions/posts';
import {App} from './app';

const mapStateToProps = (state : IStoreState) => ({posts: state.posts, post: state.post});

const mapDispatchToProps = (dispatch) => ({
     loadPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);