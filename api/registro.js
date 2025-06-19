import dbConnect from './mongodb'
import Usuario from './usuarioModel'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ exito: false, mensaje: 'Método no permitido' });

  await dbConnect();

  const { nombre, email, contraseña } = req.body || {};
  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ exito: false, mensaje: 'Faltan datos' });
  }
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    return res.status(409).json({ exito: false, mensaje: 'El email ya está registrado' });
  }
  const bcrypt = await import('bcrypt');
  const hashedPassword = await bcrypt.default.hash(contraseña, 10);
  const usuario = new Usuario({ nombre, email, contraseña: hashedPassword });
  await usuario.save();
  res.json({ exito: true, mensaje: 'Usuario registrado con éxito' });
}