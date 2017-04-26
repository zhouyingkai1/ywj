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
export async function likeComment(params) {
  return request('/main/artcleDetail/likeComment.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
// 侧边栏 分类列表
export async function getItemList(params) {
  return request('/main/getItemList.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}

//  标签页 的接口就写在这里了
export async function getTagInfo(params) {
  return request('/main/getTagInfo.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
//  大类别的喜欢
export async function hanleLikeTag(params) {
  return request('/main/hanleLikeItem.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}