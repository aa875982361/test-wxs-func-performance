Component({
  data: {
    list: [],
    "test": "sssss",
    obj: {
      xxx: "xxxx"
    }
  },
  attached: function(){
    console.log("attached");
    this.preLoadTime = 0
    this.handleScrollToLower()
  },
  methods: {
    handleScrollToLower(e){
      if(this.requestDataing){
        return
      }
      // 节流 
      console.log("handleScrollToLower", e)
      const currentTime = +new Date()
      if(currentTime - this.preLoadTime < 500 || this.data.list.length > 100 ){
        console.log("handleScrollToLower 不处理");
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
      // 延时处理
      const newList = this.data.list.concat(addList)
      console.log("设置数据");
      this.setData({
        list: newList
      })
      this.requestDataing = false
    }
  }
})