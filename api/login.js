import dbConnect from './mongodb'
import Usuario from './usuarioModel'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ exito: false, mensaje: 'Método no permitido' });

  await dbConnect();

  const { email, contraseña } = req.body || {};
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(401).json({ exito: false, mensaje: 'Usuario no encontrado' });
  }
  const bcrypt = await import('bcrypt');
  const isValidPassword = await bcrypt.default.compare(contraseña, usuario.contraseña);
  if (!isValidPassword) {
    return res.status(401).json({ exito: false, mensaje: 'Contraseña incorrecta' });
  }
  const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET || 'mi-secreto', { expiresIn: '1h' });
  res.json({ exito: true, mensaje: 'Login exitoso', token });
}