import request from '../utils/request'
export async function queryArtcleById(params){
  return request('/main/artcleDetail/queryArtcleById.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
//点赞列表
export async function likeUserList(params){
  return request('/main/artcleDetail/likeUserList.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
//相关文章列表
export async function queryAboutArtcle(params){
  return request('/main/artcleDetail/queryAboutArtcle.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
//提交评论
export async function submitComment(params){
  return request('/main/artcleDetail/submitComment.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
//获取评论列表
export async function getComment(params){
  return request('/main/artcleDetail/getComment.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}