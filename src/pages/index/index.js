const app = getApp()

Page({
  data: {
    list: []
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
    this.preLoadTime = 0
    this.handleScrollToLower()
  },
  handleScrollToLower(e){
    if(this.requestDataing){
      return
    }
    // 节流 
    console.log("handleScrollToLower", e)
    const currentTime = +new Date()
    if(currentTime - this.preLoadTime < 500 || this.data.list.length > 100 ){
      return
    }
    const tempObj = {
      "type":"scroll",
      "timeStamp":333626,
      "target":{
          "id":"",
          "offsetLeft":0,
          "offsetTop":0,
          "dataset":{
              "cardWidth":115
          }
      },
      "currentTarget":{
          "id":"",
          "offsetLeft":0,
          "offsetTop":0,
          "dataset":{
              "cardWidth":115
          }
      },
      "mark":{
  
      },
      "detail":{
          "scrollLeft":0,
          "scrollTop":0,
          "scrollHeight":206,
          "scrollWidth":1864,
          "deltaX":1287,
          "deltaY":0
      },
      "mut":false,
      "instance":{
          "selectAllComponents":null,
          "selectComponent":null,
          "removeClass":null,
          "addClass":null,
          "hasClass":null,
          "setStyle":null,
          "getDataset":null,
          "getState":null,
          "triggerEvent":null,
          "callMethod":null,
          "requestAnimationFrame":null,
          "getComputedStyle":null,
          "setTimeout":null,
          "clearTimeout":null,
          "getBoundingClientRect":null,
          "animate":null,
          "clearAnimation":null
      }
    }
    const len = this.data.list.length
    const addList = [{},{},{},{},{},{},{},{},{},{}].map((item, index) => {
      return {
        ...tempObj,
        id: len+index,
        parentId: (Math.random()*3) >> 0
      }
    })
    this.requestDataing = true
    setTimeout(() => {
      const newList = this.data.list.concat(addList)
      this.setData({
        list: newList
      })
      this.requestDataing = false
    }, 1000)
  }
})
