import { fetchUtils } from 'react-admin'
import { apiUrl } from '../utils/constants'

const httpClient = (url, options = {}) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const user = { token: `Bearer ${token}`, authenticated: !!token };
  return fetchUtils.fetchJson(url, { ...options, user });
}

export const DataProvider = {
  getList: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}?`)
      .then(({ headers, json }) => {
        // const data = [...json.users].map(resource => ({ ...resource, id: resource._id }));
        // console.log(data);
        return {
          data: json.map(resource => ({ ...resource, id: resource._id })),
          total: json.length,
        }
      });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`)
      .then(({ json }) => ({
        data: { ...json, id: json._id }
      }))
      .catch(err => console.log(err)),

  getMany: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}?`)
      .then(({ json }) => ({
        data: json.map(resource => ({ ...resource, id: resource._id }))
      }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(params.data)
    })
      .then(({ json }) => ({
        data: { ...json, id: json._id }
      })),

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data)
    })
      .then(({ json }) => ({
        data: { ...params.data, id: json._id }
      })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE'
    })
      .then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE'
    })
      .then(({ json }) => ({ data: json }))
  }
}