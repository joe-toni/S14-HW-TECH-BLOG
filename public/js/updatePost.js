//This script is meant to handle the form provided by the editPost view page and handles two possible events on the page

//This first function expects the id of the blog being edited and takes the value of the fields found in the on the form 
// before passing them to the put route of the  corresponding blog post. If the request is successful then the user will be directed
// to thier personal dashboard where they can view the updated blog post
const updatePostFormHandler = async (event, id) => {
    event.preventDefault();
  
    const blogName = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    
    if ( blogName && content) 
    {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({blogName, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create new post.');
      }
    }
  };

  //This function expects the id of the blog in question and makes a delete request to the blog api route with
  // the corresponding id, if the request is successful then the user is redirected to thier personal dashboard where they
  // can see thier post has been deleted.
  const deletePost = async (id) => 
  {

   try
    {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create new post.');
      }
    }
    catch
    {alert('Failed to create new post.');}
  };
