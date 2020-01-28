import jwtDecode from 'jwt-decode';
import http from './httpService';
import config from '../../config.json';

const apiEndpoint = config.apiEndpoint + '/auth';
const tokenKey = 'token';

http.setJwt(getJwt());

const headers = {
  'Content-Type': 'application/json; charset=utf-8'
};

export const login = async (email, password) => {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
};

export const loginWithJwt = jwt => {
  localStorage.setItem(tokenKey, jwt);
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

export const register = user => {
  const options = {
    method: 'post',
    body: {
      email: user.username,
      password: user.password
    },
    headers
  };
  return http.post(`${apiEndpoint}/register`, options);
};

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
