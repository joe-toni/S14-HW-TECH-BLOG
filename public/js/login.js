//This script page is meant to handle the form provided by the login view page and it takes the values provided in each of the 
//fields then passes them to the api route designated loging users in. If the request is successfull then the user is redirected to their 
// personalized dashboard page.
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector('#userName').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (userName && password) 
    {
      const response = await fetch('/api/user/login/', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in.');
      }
    }
  };

  document
  .querySelector('.login')
  .addEventListener('submit', loginFormHandler);