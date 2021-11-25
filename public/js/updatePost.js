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
