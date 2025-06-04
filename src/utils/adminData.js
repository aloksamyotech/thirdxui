
import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('token');
export let decodedToken = null;

if (token) {
  try {
    decodedToken = jwtDecode(token);
  } catch (e) {
    console.error("Token invalid", e);
  }
}
