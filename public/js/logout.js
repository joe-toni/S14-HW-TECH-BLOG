//This scipt is meant for the logout button that is presented on the main page only when the 
// user has logged in and it makes a request to the logout field on the user api  route, if the request 
// is successful then the user is redirected to the main page.
const logout = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
