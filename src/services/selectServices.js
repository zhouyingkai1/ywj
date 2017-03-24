import request from '../utils/request';

export async function getItems(params) {
  return request('/main/getItems.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
export async function addUserItems(params) {
  return request('/main/addItems.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
