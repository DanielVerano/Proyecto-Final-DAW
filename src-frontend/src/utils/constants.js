// Para Despliegue en Kubernetes
// export const apiUrl = process.env.NODE_ENV === 'production' ? '/api/v1' : process.env.REACT_APP_API_URL;
export const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';