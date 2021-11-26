//This script sheet is meant to handle the form provided by the createNewPost view page
//It takes the values found on the form and passes them to the post route on the blog api route
//if the post is successful then the script will redirect the site to the correstponding dashboard of the logged in user
const createPostFormHandler = async (event) => {
    event.preventDefault();
  
    const blogName = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    
    if ( blogName && content) 
    {
      const response = await fetch('/api/blog/', {
        method: 'POST',
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

  document
  .querySelector('.createForm')
  .addEventListener('submit', createPostFormHandler);