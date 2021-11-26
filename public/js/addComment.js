//This script page is meant to handle the form provided by the addComment view page
//It expects to be given the blog id that will be used to associate the new comment to the corresponding
// blog and redirect the page to that same blog if the post is successful.
const addComment = async (event, blogId) => {
    event.preventDefault();
  
    const comment = document.querySelector('#content').value.trim();
    
    if (comment) 
    {
      const response = await fetch('/api/comment/', {
        method: 'POST',
        body: JSON.stringify({blogId, comment }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/blog/${blogId}`);
      } else {
        alert('Failed to create new post.');
      }
    }
  };
