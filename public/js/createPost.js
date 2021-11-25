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