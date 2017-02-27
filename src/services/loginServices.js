import request from '../utils/request';

export function login(params) {
  return request('/login/login.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}