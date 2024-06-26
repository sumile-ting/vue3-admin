export class Updater {
  constructor (options) {
    this.oldScript = []
    this.newScript = []
    this.dispatch = {}
    this.init() // 初始化
    this.timing(options?.timer)// 轮询
  }

  async init () {
    const html = await this.getHtml()
    this.oldScript = this.parserScript(html)
  }

  async getHtml () {
    const html = await fetch('/').then(res => res.text())//读取index html
      return html
  }

  parserScript (html) {
    const reg = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/ig) // script正则
    return html.match(reg) // 匹配script标签
  }

  // 发布订阅通知
  on (key, fn) {
    (this.dispatch[key] || (this.dispatch[key] = [])).push(fn)
    return this
  }

  compare (oldArr, newArr) {
    const base = oldArr.length
    const arr = Array.from(new Set(oldArr.concat(newArr)))
    // 如果新旧length 一样无更新
    if (arr.length === base) {
      this.dispatch['no-update'].forEach(fn => {
        fn()
      })
    } else {
      // 否则通知更新
      this.dispatch.update.forEach(fn => {
        fn()
      })
    }
  }

  timing (time = 10000) {
    // 轮询
    setInterval(async () => {
      const newHtml = await this.getHtml()
      this.newScript = this.parserScript(newHtml)
      this.compare(this.oldScript, this.newScript)
    }, time)
  }
}
