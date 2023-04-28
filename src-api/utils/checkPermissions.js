/**
 * * Función para comprobar los permisos del usuario al intentar acceder a un recurso; Si el usuario no es admin o su id no coincide con la del recurso, devolverá un error.
 * @param {Object} requestUser 
 * @param {String} resourceUserId 
 * @returns 
 */
const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new Error('No está autorizado para acceder a esta ruta');
}

module.exports = checkPermissions;