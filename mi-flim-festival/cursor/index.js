/**
 * 鼠标动效
 */
// import './addWheelListener.js'

class Cursor {
  constructor(props) {
    // 普通鼠标样式区域
    this.normalSection = $('.cursor__container')
    // 播放鼠标样式区域
    this.playSection = $('.cursor__wrap--play')
    // 普通按钮
    this.defaultIcon = $('.cursor__section--default')
    // 播放按钮容器
    this.playIconSection = $('.cursor__point__section--custom')

    this.section = $('.cursor__point__section')
    this.expandedSection = $('.cursor__point__section--expand')

    // 播放按钮
    this.playIcon = `<div><svg t="1623315343047" class="icon" viewBox="0 0 1448 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3395" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M1001.238328 486.451606a29.215858 29.215858 0 0 1 0 51.100228l-525.888886 292.158581a29.224459 29.224459 0 0 1-29.026636-0.357801 29.222739 29.222739 0 0 1-14.389464-25.206075V219.822497a29.219298 29.219298 0 0 1 43.4161-25.534632l525.888886 292.163741z" p-id="3396"></path></svg></div>`

    // 暂停按钮
    // this.pauseIcon = `<div><svg t="1623315379554" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4362" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M688.64 168.96c-40.96 0-74.24 35.84-74.24 74.24v552.96c0 40.96 35.84 74.24 74.24 74.24s74.24-35.84 74.24-74.24V243.2c0-40.96-35.84-74.24-74.24-74.24z m-353.28 0c-40.96 0-74.24 35.84-74.24 74.24v552.96c0 40.96 35.84 74.24 74.24 74.24s74.24-35.84 74.24-74.24V243.2c2.56-40.96-33.28-74.24-74.24-74.24z" fill="#707070" p-id="4363"></path></svg></div>`
    this.bindMouse()
  }

  /** 绑定鼠标事件 */
  bindMouse() {
    const _self = this

    // 绑定普通区域鼠标移入事件
    this.normalSection.on('mouseover', function () {
      _self.section.attr('data-visible', 'true')
    })

    // 绑定普通区域鼠标移出事件
    this.normalSection.on('mouseleave', function () {
      _self.section.attr('data-visible', 'false')
    })

    // 绑定普通区域鼠标移动事件
    this.normalSection.on('mousemove', function (e) {
      const flag = _self.expandedSection.attr('data-expanded')
      if (!flag) return
      const x = e.clientX
      const y = e.clientY
      $('.cursor__point').attr('style', `--mouse-x:${x}px;--mouse-y:${y}px`)
    })

    // 绑定播放区域鼠标移入事件
    this.playSection.on('mouseover', function () {
      _self.expandedSection.attr('data-expanded', 'true')
      _self.playIconSection.html(_self.playIcon)
    })

    // 绑定播放区域鼠标移出事件
    this.playSection.on('mouseleave', function () {
      _self.expandedSection.attr('data-expanded', 'false')
      _self.playIconSection.html()
    })

    // 绑定播放区域鼠标移动事件
    this.playSection.on('mousemove', function (e) {
      const x = e.clientX
      const y = e.clientY
      $('.cursor__point').attr('style', `--mouse-x:${x}px;--mouse-y:${y}px`)
    })
  }
}

new Cursor()

