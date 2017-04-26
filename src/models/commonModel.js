/**
 * 通用的 model
 */
import {message} from 'antd'
import {stsAuth, upload, preRequestImage, getImageInfo} from '../services/commonServices'

export default {
  namespace: 'upload',
  state: {
    stsCache: null,
  },

  effects: {
    *upload({file, filename,callback}, {select, put, call}){
      let currentState = yield select(state => state.upload)
      //如果 sts 缓存存在 不请求 sts
      if (!currentState.stsCache) {
        const stsCache = yield call(stsAuth, 1000)

        //STS 授权请求之后处理
        if (stsCache && stsCache.dir) {
          yield put({
            type: 'updateState',
            payload: {
              stsCache: stsCache
            }
          })
          currentState = yield select(state => state.upload)
        } else {
          message.error('STS 授权失败')
          return false
        }
      }
      const preData = yield call(preRequestImage, filename, 1000)
      let imageInfo = null
      // 如果库中存在这张照片 直接获取图片信息
      if (preData && ~'200'.indexOf(preData.status)) {
        imageInfo = yield call(getImageInfo, filename, 1000)
      } else {
        console.log(file,'file')
        console.log(filename,'filename')
        var params = new FormData()
        params.append('key', currentState.stsCache.dir + filename)
        params.append('policy', currentState.stsCache.policy)
        params.append('OSSAccessKeyId', currentState.stsCache.accessid)
        params.append('success_action_status', 200)
        params.append('signature', currentState.stsCache.signature)
        params.append('file', file)
        const uploadImage = yield call(upload, params, 1000)
        if (uploadImage && ~'200'.indexOf(uploadImage.status)) {
          imageInfo = yield call(getImageInfo, filename, 1000)
        }else{
          message.error('上传失败，请重试！')
          return false
        }
      }
      if(~'400'.indexOf(imageInfo.code)){
        message.error('上传图片为非 RGB 图片')
        callback({code: 'NPRGB'})
        return false
      }
      let image_result_object = {
          'image_rotation': 0.0,
          'image_height': 0.0,
          'image_date': '',
          'image_id': 0,
          'image_orientation': 0,
          'image_remark': '',
          'image_url': '',
          'image_width': 0.0
        }
      image_result_object.image_orientation = imageInfo.Orientation && imageInfo.Orientation.value || '0'
      image_result_object.image_width = imageInfo.ImageWidth.value
      image_result_object.image_height = imageInfo.ImageHeight.value
      image_result_object.image_url = 'http://static.timeface.cn/times' + filename
      image_result_object.image_date = imageInfo.DateTimeOriginal && new Date(imageInfo.DateTimeOriginal.value.split(' ')[0].replace(/:/g,'-'))
          .getTime() ||'-28800000'
      callback(image_result_object)
    },
  },

  reducers: {
    updateState(state, {payload}){
      return {...state, ...payload}
    },
  },

}