const updateComment = async (event, blogId, commentId) => {
    event.preventDefault();
  console.log(blogId);
  console.log(commentId);
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
