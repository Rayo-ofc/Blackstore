import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  contraseña: String,
});

export default mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);