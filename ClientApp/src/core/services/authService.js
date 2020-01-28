import jwtDecode from 'jwt-decode';
import http from './httpService';
import config from '../../config.json';

const apiEndpoint = config.apiEndpoint + 'auth';
const tokenKey = 'token';

export const login = async (email, password) => {
  const { data: jwt } = await http.post(`${apiEndpoint}/login`, {
    email,
    password
  });
  localStorage.setItem(tokenKey, JSON.stringify(jwt));
};

export const loginWithJwt = jwt => {
  localStorage.setItem(tokenKey, JSON.stringify(jwt));
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = JSON.parse(jwt);
    return jwtDecode(user['tokenString']);
  } catch (ex) {
    return null;
  }
};

export const getJwt = () => {
  const jwt = localStorage.getItem(tokenKey);
  if (!jwt) return null;
  const token = JSON.parse(jwt)['tokenString'];
  return token;
};

http.setJwt(getJwt());

export const register = user => {
  return http.post(`${apiEndpoint}/register`, user);
};

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  register
};
