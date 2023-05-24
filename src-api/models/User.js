const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Introduzca su nombre'],
        minlength: 3,
        maxlength: 50
    },
    surname: {
        type: String,
        required: [true, 'Introduzca sus apellidos'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Introduzca su email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Introduzca un email válido'
        }
    },
    password: {
        type: String,
        required: [true, 'Introduzca una contraseña'],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/drjsqcclk/image/upload/v1684924663/profile-default_g5lgeo.png'
    }
});

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema);