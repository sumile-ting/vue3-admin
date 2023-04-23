import { ElMessageBox, ElMessage } from 'element-plus'
import { h} from 'vue'

export default {
  install: (app, options) => {
    // 在这里编写插件代码
    app.config.globalProperties.$sumileMsgBox = (...args) => {

      const option = {
        title: '',
        type: 'info',
        message: '',
        subTitle: ''
      }

      if(args.length === 1) {
        Object.assign(option, ...args)
      } else if(args.length === 2) {
        option.message =  args[0]
        Object.assign(option, ...args[1])
      } else if(args.length === 3) {
        option.message =  args[0]
        option.title =  args[1]
        Object.assign(option, ...args[2])
      } else if(args.length === 4) {
        option.message =  args[0]
        option.title =  args[1]
        option.subTitle =  args[2]
        Object.assign(option, ...args[3])
      }
      

      return ElMessageBox({
        customClass: 'sumile-message-box',
        autofocus: false,
        ...option,
        title: option.title,
        message: h('p', {class: 'sumile-message-box-content'}, [
          h('span', null, option.subTitle),
          h('div', { style: 'color: rgba(0,0,0,0.65)' }, option.message) ,
        ]),
      })

    }
  }
}