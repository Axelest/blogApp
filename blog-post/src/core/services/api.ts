/** Save post api call */
export const savePost = (data : any) : any => {
     return (fetch('/save', {
          method: 'POST',
          headers: {
               'content-type': 'application/json'
          },
          body: JSON.stringify(data)
     }).then(response => response.json()).then(response => response).catch(error => error));
};

/** Get all posts api call */
export const getPosts = () : any => {
     return (fetch('/posts').then(data => data.json()).then(data => data).catch(error => error))
}

/** Get all posts no filter api call */
export const getPostsAll = () : any => {
     return (fetch('/all').then(data => data.json()).then(data => data).catch(error => error))
}

/** Get single post by id api call */
export const getPost = async(id : number) => await(fetch(`/post?id=${id}`).then(post => post.json()).then(post => post).catch(error => error));

/** Edit single post by id api call */
export const updatePost = (data : any) : any => {
     return (fetch('/edit', {
          method: 'POST',
          headers: {
               'content-type': 'application/json'
          },
          body: JSON.stringify(data)
     }).then(result => result.json()).then(result => result).catch(error => error));
}

/** Add comment single post api call */
export const addCommentPost = (data : any) : any => {
     return (fetch('/addComment', {
          method: 'POST',
          headers: {
               'content-type': 'application/json'
          },
          body: JSON.stringify(data)
     }).then(result => result.json()).then(result => result).catch(error => error));
}

/** Delete single post by id api call */
export const removePost = (postId : number) : any => (fetch('/remove', {
     method: 'POST',
     headers: {
          'content-type': 'application/json'
     },
     body: JSON.stringify({id: postId})
}).then(response => response.json()).then(response => response).catch(error => error));