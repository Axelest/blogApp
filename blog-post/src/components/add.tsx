import * as React from 'react';
import 'draft-js/dist/Draft.css';
import {bindActionCreators} from 'redux';
import {addPost} from '../core/actions/post';
import {connect} from 'react-redux';

export class CreateComponent extends React.Component < any, {} > {
     state: any = {
          title: '',
          content: '',
          media: '',
          status: ''
     };

     constructor(props : any) {
          super(props);
          this.onChange = this
               .onChange
               .bind(this);
          this.submit = this
               .submit
               .bind(this);
     }

     /** Keep track of the input changes */
     public onChange(e : any): void {
          const object: any = {};
          object[e.target.name] = e.target.value;
          this.setState(object);
     }

     /** Submit the form */
     public submit(e : any): void {
          e.preventDefault();
          this
               .props
               .addPost(this.state);
          window.location.href = '/';
     }

     public render() {
          return (
               <div className="post-container">
                    <h1 className="page-title">Write one great article</h1>
                    <div className="form-holder">
                         <input type="text" name="title" placeholder="Title" onChange={this.onChange}/>
                         <textarea
                              name="content"
                              placeholder="Write something cool here."
                              onChange={this.onChange}/>
                         <input
                              type="text"
                              name="media"
                              placeholder="Media Url"
                              onChange={this.onChange}/>
                         <select name="status" placeholder="Status" onChange={this.onChange}>
                              <option value="">Status</option>
                              <option value="draft">Draft</option>
                              <option value="publish">Publish</option>
                              <option value="archive">Archive</option>
                         </select>
                         <button type="submit" onClick={this.submit}>Save</button>
                    </div>
               </div>
          );
     }
}

const mapStateToProps = (data) => ({state: data});
const mapDispatchToProps = dispatch => bindActionCreators({
     addPost
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateComponent);