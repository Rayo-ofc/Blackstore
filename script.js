// Black
const registroForm = document.getElementById('registro-form');
const loginForm = document.getElementById('login-form');
const mensajeDiv = document.getElementById('mensaje');

// store
const URL_REDIRECCION_REGISTRO = "black.html";
const URL_REDIRECCION_LOGIN = "black.html";

// El mejr
const ENDPOINT_REGISTRO = "/api/registro";
const ENDPOINT_LOGIN = "/api/login";

function mostrarMensaje(texto, exito = true) {
  mensajeDiv.textContent = texto;
  mensajeDiv.style.background = exito ? '#388e3c' : '#d32f2f';
  mensajeDiv.style.color = '#fff';
  mensajeDiv.style.display = "block";
  setTimeout(() => {
    mensajeDiv.style.display = "none";
    mensajeDiv.textContent = '';
  }, 5000);
}

if (registroForm) {
  registroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
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
      const response = await fetch(ENDPOINT_REGISTRO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, contraseña }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.exito) {
        mostrarMensaje((data.mensaje || 'Error en el registro.'), false);
      } else {
        mostrarMensaje(data.mensaje || 'Registro exitoso.');
        registroForm.reset();
        setTimeout(() => {
          window.location.href = URL_REDIRECCION_REGISTRO;
        }, 1500);
      }
    } catch (err) {
      mostrarMensaje('Error de conexión. Intenta más tarde.', false);
    }
    btn.disabled = false;
    btn.textContent = 'Registrarse';
  });
}

if (loginForm) {
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
      const response = await fetch(ENDPOINT_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contraseña }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.exito) {
        mostrarMensaje((data.mensaje || 'Error en el login.'), false);
      } else {
        mostrarMensaje(data.mensaje || 'Login exitoso.');
        setTimeout(() => {
          window.location.href = URL_REDIRECCION_LOGIN;
        }, 1200);
      }
    } catch (err) {
      mostrarMensaje('Error de conexión. Intenta más tarde.', false);
    }
    btn.disabled = false;
    btn.textContent = 'Iniciar sesión';
  });
}