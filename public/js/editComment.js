//This scipt file is meant to handle the form provided by the editComment view page and I handles two possible events on the form.

//This first function fires if the form is submitted normally and sends  a put request to the specified route with the value
// of the comment passed over through the body of the request. If the request succeeds then the user is redirected to the 
//page of the blog that the comment corresponds to.
const updateComment = async (event, blogId, commentId) => {
    event.preventDefault();
    const comment = document.querySelector('#content').value.trim();
    
    if (comment) 
    {
      const response = await fetch(`/api/comment/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({comment}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/blog/${blogId}`);
      } else {
        alert('Failed to edit  comment.');
      }
    }
}

//This second function simply puts a delete request to the route to the specified comment
//if the request is successfull then the page is redirected to the blog page the comment originally 
// belonged to.
  const deletePost = async (blogId, commentId) => 
  {
   try
    {
      const response = await fetch(`/api/comment/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/blog/${blogId}`);
      } else {
        alert('Failed to delete comment.');
      }
    }
    catch
    {alert('Failed to delete comment.');}
  };
