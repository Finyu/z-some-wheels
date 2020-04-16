```shell
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
export function fetch (options) {
  let data = ''
  const paramsOrData = options.params || options.data
  data = qs.stringify(Object.assign(paramsOrData), { indices: false })
  return new Promise((resolve, reject) => {
    const instance = axios.create({ // instance创建一个axios实例，可以自定义配置
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': options.typeFormData ? 'multipart/form-data' : 'application/json;charset=UTF-8'
      },
      responseType: options.isExport ? 'blob' : 'json',
      timeout: 30 * 1000, // 30秒超时,超时设置
      data: data
    })
    instance(options)
      .then(response => { // then请求数据成功后进行操作
        resolve(response) // 把请求的数据发到引用的地方
        if (options.isExport) {
          const blob = new Blob([response.data]) // new Blob([res])中不加data就会返回下图中[objece objece]内容（少取一层）
          if (!!window.ActiveXObject || 'ActiveXObject' in window) { // 兼容IE
            window.navigator.msSaveOrOpenBlob(blob, `${response.config.fileName}`)
          } else {
            const aLink = document.createElement('a')
            aLink.download = `${response.config.fileName}`
            aLink.style.display = 'none'
            aLink.href = URL.createObjectURL(blob)
            document.body.appendChild(aLink)
            aLink.click()
            URL.revokeObjectURL(aLink.href) // 释放URL 对象
            document.body.removeChild(aLink)
          }
        }
      })
      .catch(error => {
        reject(error)
        Message({
          message: '请求失败',
          type: 'error',
          showClose: true
        })
      })
  })
}
```