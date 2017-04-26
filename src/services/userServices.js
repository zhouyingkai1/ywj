import request from '../utils/request';

export async function getUserLikeArtcle(params) {
  return request('/main/user/getUserLikeArtcle.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
export async function getUserInfo(params) {
  return request('/main/user/getUserInfo.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
