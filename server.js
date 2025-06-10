// server.js
const express = require('express');
const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/mi-base-de-datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error conectando a MongoDB:', err));

// Esquema de usuario
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  contraseña: String,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Registro de usuario
app.post('/registro', async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;
    if (!nombre || !email || !contraseña) {
      return res.status(400).send('Faltan datos');
    }
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).send('El email ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const usuario = new Usuario({ nombre, email, contraseña: hashedPassword });
    await usuario.save();
    res.send('Usuario registrado con éxito');
  } catch (err) {
    res.status(500).send('Error en el registro');
  }
});

// Login de usuario
app.post('/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ exito: false, mensaje: 'Usuario no encontrado' });
    }
    const isValidPassword = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isValidPassword) {
      return res.status(401).json({ exito: false, mensaje: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ userId: usuario._id }, 'mi-secreto', { expiresIn: '1h' });
    res.json({ exito: true, mensaje: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ exito: false, mensaje: 'Error en el login' });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});