const User = require('../models/User');
const { createToken } = require('../utils');

const register = async (req, res) => {
    const { name, surname, email, password } = req.body;

    // Check si el email ya existe
    const emailExists = await User.findOne({ email });
    if (emailExists) throw new Error('El email introducido ya existe');

    // Check si es la primera cuenta, en ese caso se le añade el rol de admin
    const firstAccount = await User.countDocuments({}) === 0;
    const role = firstAccount ? 'admin' : 'user';

    // Registrar usuario
    const user = await User.create({ name, surname, email, password, role });

    // Crear payload y token de usuario
    const payloadUser = { name: user.name, userId: user._id, role: user.role };
    const token = createToken(payloadUser);

    res.status(200).json({ payloadUser, token });
}
const login = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si existen el email y password
    if (!email || !password) throw new Error('Introduzca el email y la contraseña');

    // Check si el email existe en la DB
    const user = await User.findOne({ email });
    if (!user) throw new Error('El email introducido no existe');

    // Check si la contraseña introducida coincide con la de la DB
    const passwordCorrecta = await user.comparePassword(password);
    if (!passwordCorrecta) throw new Error('La contraseña introducida no es correcta');

    // Crear payload y token de usuario
    const payloadUser = { name: user.name, userId: user._id, role: user.role };
    const token = createToken(payloadUser);

    res.status(200).json({ payloadUser, token });
}

module.exports = { register, login };