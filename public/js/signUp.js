  //This scipt is similar to the one setup for the login page eccept this one is assigned to the 
  // signUp view page and makes a request to the user api route ment to create new users. If the request is successful
  // then the user is redirected to their personal dashboard page.
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector('#userName').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (userName && password) {
      const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  document
  .querySelector('.signUp')
  .addEventListener('submit', signupFormHandler);