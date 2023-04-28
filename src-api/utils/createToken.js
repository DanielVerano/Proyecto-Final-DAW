const jwt = require('jsonwebtoken');

/**
 * * Función que crea y devuelve un JSONWebToken (JWT) para posteriormente enviarlo al cliente en una respuesta cuando se registre o inicie sesión.
 * @param {Object} payload 
 * @returns 
 */
const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
}

module.exports = createToken;