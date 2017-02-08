/**
 * 统一 header 过滤
 * Created by MFChen on 21/12/2016.
 */
import kits from './kits'
export default {
  request: (config) => {
    if (!config.headers) {
      config.headers = {};
    }
    if (config.method == 'POST' && !config.isAddToken) {
      Object.assign(config.headers, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    }
    if (/zw/.test(location.href)) {
      // const zwToken = kits.getCookies('tf-token');
      const zwUid = kits.getCookies('tf-uid');
      // 如果headers中已有tf-uid,则不再覆盖
      if (zwUid && !config.headers['tf-uid'] && !config.isAddToken) {
        Object.assign(config.headers, {
          // 'tf-token': kits.getCookies('tf-token'),
          'tf-uid': kits.getCookies('tf-uid')
        });
      }
    } else {
      const zwToken = kits.getCookies('zw-token');
      const zwUid = kits.getCookies('zw-uid');
      // 如果headers中已有zw-token和zw-uid,则不再覆盖
      if (zwToken && zwUid && !config.headers['zw-token'] && !config.headers['zw-uid'] && !config.isAddToken) {
        Object.assign(config.headers, {
          'zw-token': kits.getCookies('zw-token'),
          'zw-uid': kits.getCookies('zw-uid')
        });
      }
    }

    return config;
  }
};