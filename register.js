const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  // Validação simples
  if(password !== confirmPassword){
    errorMessage.textContent = 'As senhas não coincidem!';
    return;
  }

  if(password.length < 4){
    errorMessage.textContent = 'Senha deve ter pelo menos 4 caracteres!';
    return;
  }

  // Simulação de cadastro
  errorMessage.textContent = '';
  alert(`Conta criada com sucesso!\nUsuário: ${username}\nEmail: ${email}`);
  // Redirecionar para login
  window.location.href = "login.html";
});
