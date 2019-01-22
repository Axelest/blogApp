import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deletePost, editPost} from '../core/actions/post';
import {getPost} from '../core/services/api';

export class EditComponent extends React.Component < any, {} > {
     state: any = {
          title: '',
          content: '',
          media: '',
          status: ''
     };

     constructor(props : any) {
          super(props);
          this.save = this
               .save
               .bind(this);
          this.cancel = this
               .cancel
               .bind(this);
          this.onChange = this
               .onChange
               .bind(this);
          this.getPostNow = this
               .getPostNow
               .bind(this);
          this.remove = this
               .remove
               .bind(this);
     }

     componentWillMount() {
          this.getPostNow();
     }

     /** Hit the api to grab the post directly */
     public async getPostNow() {
          const data = await getPost(parseInt(this.props.match.params.id, 10));
          this.setState(data.data);

     }

     /** Keep track of the input changes */
     public onChange(e : any): void {
          const object: any = {};
          object[e.target.name] = e.target.value;
          this.setState(object);
     }

     /** Cancel redirect */
     public cancel(): any {
          return window.location.href = '/';
     }

     /** Save post updates */
     public save() {
          this
               .props
               .editPost(this.state);
          return window.location.href = '/';
     }

     /** Remove post */
     public remove() {
          this
               .props
               .deletePost(this.state.id);
          return window.location.href = '/';
     }

     public render() {
          return (
               <div className="post-container">
                    <h1 className="page-title">Make it better or not</h1>
                    <img src={this.state.media} alt="post-image"/>
                    <div className="form-holder">
                         <label htmlFor="">Media url:</label>
                         <input
                              type="text"
                              name="media"
                              defaultValue={this.state.media}
                              onChange={this.onChange}/>
                         <label htmlFor="">Post title:</label>
                         <input
                              type="text"
                              name="title"
                              defaultValue={this.state.title}
                              onChange={this.onChange}/>
                         <label htmlFor="">Post content:</label>
                         <textarea name="content" value={this.state.content} onChange={this.onChange}/>
                         <label htmlFor="">Post status:</label>
                         <select name="status" value={this.state.status} onChange={this.onChange}>
                              <option value="">Status</option>
                              <option value="draft">Draft</option>
                              <option value="publish">Publish</option>
                              <option value="archive">Archive</option>
                         </select>
                         <button className="button-like good-button" onClick={this.save}>Update</button>
                         <button className="danger-button button-like" onClick={this.remove}>Remove</button>
                         <button className="button-like" onClick={this.cancel}>Cancel</button>
                    </div>

               </div>
          );
     }
}

const mapStateToProps = (data) => ({state: data});
const mapDispatchToProps = dispatch => bindActionCreators({
     deletePost,
     editPost
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditComponent);