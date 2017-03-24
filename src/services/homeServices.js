import request from '../utils/request';

export async function artcleList(params) {
  return request('/main/getArtcleList.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
export async function likeArtcle(params) {
  return request('/main/likeArtcle.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}