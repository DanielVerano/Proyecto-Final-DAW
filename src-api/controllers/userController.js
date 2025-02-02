const User = require('../models/User');
const { checkPermissions, createToken, handleUpload } = require('../utils');

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password');
    res.status(200).json(users);
}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password');

    if (!user) throw new Error(`No existe el usuario con id ${req.params.id}`);
    checkPermissions(req.user, user._id);

    res.status(200).json(user);
}

const updateUser = async (req, res) => {
    const { name, surname, email } = req.body;
    if (!name || !surname || !email) throw new Error('Proporcione un nombre, apellidos e email');

    const user = await User.findOneAndUpdate(
        { _id: req.user.userId },
        { name, surname, email },
        { new: true, runValidators: true });

    const payloadUser = { name: user.name, userId: user._id, role: user.role };
    const token = createToken(payloadUser);

    res.status(200).json({ payloadUser, token });
}

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) throw new Error('Proporcione su antigua y la nueva contraseña');

    const user = await User.findOne({ _id: req.user.userId });
    const isPassCorrect = await user.comparePassword(oldPassword);

    if (!isPassCorrect) throw new Error('La contraseña introducida no es correcta');

    user.password = newPassword;
    await user.save();

    res.status(200).json({ msg: 'Contraseña actualizada' });
}

const deleteUser = async (req, res) => {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) throw new Error(`No existe el usuario con id ${req.params.id}`);

    res.status(200).json({ msg: 'Usuario eliminado' });
}

const uploadImage = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = `data:${req.file.mimetype};base64,${b64}`;
        const cldRes = await handleUpload(dataURI);
        res.status(200).json(cldRes);
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
}

const updateAvatar = async (req, res) => {
    const { avatar } = req.body;
    const user = await User.findOneAndUpdate(
        { _id: req.user.userId },
        { avatar },
        { new: true, runValidators: true });

    res.status(200).json(user);
}

module.exports = {
    getAllUsers, getSingleUser, updateUser, updateUserPassword, deleteUser, uploadImage, updateAvatar
}