const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error('Error de autenticación');

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.decode(token, process.env.JWT_SECRET);

        req.user = { name: payload.name, userId: payload.userId, role: payload.role };
        next();
    } catch (error) {
        throw new Error('Error al verificar el token');
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new Error('No está autorizado para acceder a esta ruta');
        }
        next();
    }
}

module.exports = {
    authenticateUser,
    authorizePermissions
}