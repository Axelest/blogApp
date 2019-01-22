import * as React from 'react';
import {connect} from 'react-redux';
import {getPost, addComment} from '../core/actions/post';
import {bindActionCreators} from 'redux';
import {IPost} from '../core/models/post';
import {Link} from 'react-router-dom';
import * as moment from 'moment';

export class PostComponent extends React.Component < any, {} > {
     state: any;
     constructor(props : any) {
          super(props);
          this.htmlMarkup = this
               .htmlMarkup
               .bind(this);
          this.state = {
               addComment: false,
               contentHolder: ''
          }
          this.saveComment = this
               .saveComment
               .bind(this);
          this.onChange = this
               .onChange
               .bind(this);
          this.toggleComment = this
               .toggleComment
               .bind(this);
     }

     componentDidMount() {
          const id = this.props.match.params.id;
          this
               .props
               .getPost(parseInt(id, 10));
     }

     public toggleComment() {
          this.setState({
               addComment: !this.state.addComment
          });
     }

     public onChange(e : any) {
          this.setState({contentHolder: e.target.value});
     }

     public saveComment() {
          // Comment object
          const comment = {
               id: new Date().getTime(),
               content: this.state.contentHolder,
               createdDate: new Date()
          }
          const {state} = this.props;
          const post : IPost = state.rootReducer.post;
          post
               .comments
               .push(comment);
          this
               .props
               .addComment(post);
          this.toggleComment();
     }

     public htmlMarkup(data : any) {
          return {__html: data}
     }
     public render() {
          const {state} = this.props;
          const post : IPost = state.rootReducer.post;

          return (
               <div className="post-container">
                    <div className="post-item-page">
                         <p className="post-date text-center">{moment(post.createdDate).format('LL')}</p>
                         <h1
                              className="post-title-page text-center"
                              dangerouslySetInnerHTML={this.htmlMarkup(post.title)}/>
                         <img src={post.media} alt="post-image" className="post-image-page"/>
                         <div className="content-holder">
                              <p
                                   className="post-content-page"
                                   dangerouslySetInnerHTML={this.htmlMarkup(post.content)}/>
                              <br/>
                              <br/>
                              <Link className="button-like" to={'/edit/' + post.id}>Edit</Link>
                              <Link className="button-like" to={'/'}>Back</Link>
                              <button className="button-like good-button" onClick={this.toggleComment}>{(!this.state.addComment)
                                        ? 'Add Comment'
                                        : 'Cancel'}</button>
                         </div>
                         <div
                              className={(post.comments.length > 0)
                              ? 'comments-container show'
                              : 'comments-container hide'}>
                              <strong className="comments-title">The community says:</strong>
                              {post
                                   .comments
                                   .map((comment : any, key : number) => (
                                        <div className="commnent-item">
                                             <p className="comment-content">{comment.content}</p>
                                             <p className="comment-date">Posted on: {moment(comment.createdDate).format('LL')}</p>
                                             <p className="comment-author">- By anonymous</p>
                                        </div>
                                   ))}
                         </div>
                         <div
                              className={(this.state.addComment)
                              ? 'comment-box show'
                              : 'comment-box hide'}>
                              <label htmlFor="">Add comment</label>
                              <textarea name="comment" onChange={this.onChange}>Add comment...</textarea>
                              <button className="button-like good-button" onClick={this.saveComment}>Save</button>
                         </div>
                    </div>
               </div>
          );
     }
}

const mapStateToProps = (data) => ({state: data});
const mapDispatchToProps = dispatch => bindActionCreators({
     getPost,
     addComment
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);