// script.js
const registroForm = document.getElementById('registro-form');
const loginForm = document.getElementById('login-form');
const mensajeDiv = document.createElement('div');
mensajeDiv.id = 'mensaje';
mensajeDiv.style.margin = '10px 0 15px 0';
mensajeDiv.style.color = '#fff';
mensajeDiv.style.textAlign = 'center';
// Agregamos el mensajeDiv al principio del body (puedes moverlo donde quieras)
document.body.insertBefore(mensajeDiv, document.body.firstChild);

function mostrarMensaje(texto, exito = true) {
  mensajeDiv.textContent = texto;
  mensajeDiv.style.background = exito ? '#388e3c' : '#d32f2f';
  mensajeDiv.style.color = '#fff';
  mensajeDiv.style.borderRadius = '7px';
  mensajeDiv.style.padding = '8px 19px';
  mensajeDiv.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
  setTimeout(() => mensajeDiv.textContent = '', 5000);
}

// REGISTRO
registro document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const contraseña = document.getElementById('contraseña').value.trim();
  if (!nombre || !email || !contraseña) {
    mostrarMensaje('Por favor, completa todos los campos de registro.', false);
    return;
  }
  const btn = registroForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Registrando...';
  try {
    const response = await fetch('/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, contraseña }),
    });
    if (!response.ok) {
      const error = await response.text();
      mostrarMensaje(error || 'Error en el registro.', false);
    } else {
      const data = await response.text();
      mostrarMensaje(data || 'Registro exitoso.');
      registroForm.reset();
    }
  } catch (err) {
    mostrarMensaje('Error de conexión. Intenta más tarde.', false);
  }
  btn.disabled = false;
  btn.textContent = 'Registrarse';
});

// LOGIN
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email-login').value.trim();
  const contraseña = document.getElementById('contraseña-login').value.trim();
  if (!email || !contraseña) {
    mostrarMensaje('Por favor, completa todos los campos de login.', false);
    return;
  }
  const btn = loginForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Ingresando...';
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contraseña }),
    });
    if (!response.ok) {
      const error = await response.text();
      mostrarMensaje(error || 'Error en el login.', false);
    } else {
      const data = await response.json();
      if (data.exito) {
        mostrarMensaje(data.mensaje || 'Login exitoso.');
        // Redirige si lo deseas:
        // window.location.href = "/panel"; 
      } else {
        mostrarMensaje(data.mensaje || 'Credenciales incorrectas.', false);
      }
    }
  } catch (err) {
    mostrarMensaje('Error de conexión. Intenta más tarde.', false);
  }
  btn.disabled = false;
  btn.textContent = 'Iniciar sesión';
});