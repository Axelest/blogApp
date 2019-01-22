import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAll} from '../core/actions/posts';
import {IPost} from '../core/models/post';
import {Link} from 'react-router-dom';

export class AllComponent extends React.Component < any, {} > {
     constructor(props : any) {
          super(props);
          this.htmlMarkup = this
               .htmlMarkup
               .bind(this);
     }

     htmlMarkup(data : any) {
          return {__html: data};
     }
     componentDidMount() {
          this
               .props
               .getAll();
     }
     render() {
          const {state} = this.props;
          const posts = state.rootReducer.posts.data || [];
          return (
               <div className="post-container">
                    <h1 className="page-title">Displaying all no filters</h1>
                    {posts.map((post : IPost, index : number) => <div className="post-item" key={index}>
                         <img className="post-thumb-item" src={post.media} alt="post-item-image"/>
                         <div className="post-copy-container">
                              <h2 className="post-title-item">
                                   <Link to={'/post/' + post.id}>{post.title}</Link>
                              </h2>
                              <p
                                   className="post-content-item"
                                   dangerouslySetInnerHTML={this.htmlMarkup(post.content)}/>
                         </div>
                         <strong>Status: {post.status}</strong>
                    </div>)}
               </div>
          );
     }
}

const mapStateToProps = (data) => ({state: data});
const mapDispatchToProps = dispatch => bindActionCreators({
     getAll
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AllComponent);