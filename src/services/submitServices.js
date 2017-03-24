import request from '../utils/request';

export async function submit(params) {
  return request('/main/submit.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
