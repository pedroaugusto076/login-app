const form = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const res = await fetch('/api/register', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ username, email, password })
  });
  const data = await res.json();
  if(data.error) errorMessage.textContent = data.error;
  else window.location.href = 'login.html';
});
