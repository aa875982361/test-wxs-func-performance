const simulate = require('miniprogram-simulate')
const path = require("path")
const componentPath = path.join(__dirname, "../wxsComp")
test("测试wxs页面", async () => {
    const componentId = simulate.load(componentPath)
    const comp = simulate.render(componentId)
    const parent = document.createElement('parent-wrapper') // 创建容器节点
    comp.attach(parent) // 将组件插入到容器节点中，会触发 attached 生命周期
    const scrollView = comp.querySelector("#scrollView")
    scrollView.dispatchEvent("scrolltolower", {
        test: "xxx",
        event: {
            a:1
        }
    })
    simulate.sleep(3000)
    // 判断组件渲染结果
    console.log("comp.dom.innerHTML", comp.dom.innerHTML);
    // 执行其他的一些测试逻辑

    comp.detach() // 将组件从容器节点中移除，会触发 detached 生命周期
})