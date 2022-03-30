## 背景
我们发现有个页面在加载100个节点的时候会很卡，正常来说应该不会这么卡的。所以我深入排查了一下问题的原因。

## 场景
有个横向滚动的列表，向右滚动到最右边会加载新的列表，而两个卡片有可能是属于一个相同的父节点，则需要判断是否为同一个节点，方便写样式。

## 节点代码实例
```
<wxs module="utils">
var some_msg = "hello world";
module.exports = {
  msg : some_msg,
  judgeSameParent: function(list, index){
    if(index<1 || list.length <= index){
      return false
    }
    return list[index-1].parentId === list[index].parentId
  }
}
</wxs>
<view class="intro">测试 wxs 调用函数传入数组的性能</view>
<view>
  <scroll-view
    scroll-x
    id="scrollView"
    style="height: 300rpx;display: flex; background-color: gray;"
    lower-threshold="300rpx"
    bindscrolltolower="handleScrollToLower"
  >
    <view style="display: flex; flex-direction: row;">
      <view 
        wx:for="{{list}}" 
        style="width: 200rpx;height: 200rpx;margin-top: 50rpx;  flex-shrink: 0;background-color: green;margin-right: 10rpx;" 
        wx:for-index="idx" 
        wx:for-item="item"
        wx:key="idx"
      >
        <view wx:if="{{utils.judgeSameParent(list, idx)}}" style="width: 20rpx; height: 20rpx; background-color: greenyellow;"></view>
        <view wx:if="{{utils.judgeSameParent(list, idx)}}" style="width: 20rpx; height: 20rpx; background-color: greenyellow;"></view>
      </view>
    </view>
  </scroll-view>
</view>
```

通过performance面板查看到页面运行性能会比较差，有一个运行时花了169ms
![ ](https://mmbiz.qpic.cn/sz_mmbiz_png/DvQjsaTxTkdTBwqhQXXQ5Wz4McqjBQ8fIFqGoXMcEvsmDfKSK17yAf9ibqtzY4cKDNWL20mxaGqhZLVzP7iaxntg/0?wx_fmt=png)

深入查看究竟是哪个函数耗时比较多，发现都是$gdc 函数比较耗时
![ ](https://mmbiz.qpic.cn/sz_mmbiz_png/DvQjsaTxTkdTBwqhQXXQ5Wz4McqjBQ8fsaPj0NmlPbC3Up9hAO95aN0YFTR8yaQmXHCn7qp57uEMTibN4QkVOEA/0?wx_fmt=png)

## 深入排查$gdc 函数究竟是什么
之前在做单元测试渲染的时候，发现可以通过小程序原生编译器编译wxml页面，于是我接入了单元测试，劫持了wxml的编译结果，找到了$gdc函数。
![ ](https://mmbiz.qpic.cn/sz_mmbiz_png/DvQjsaTxTkdTBwqhQXXQ5Wz4McqjBQ8f7qQDm4DRjc4qciaE50ib8ia2RTagJldficu1PaQPyFc7xaGrhfnXmgrjcw/0?wx_fmt=png)
经过分析，发现$gdc函数是一个自定义深复制函数。
所以如果我的数组越大，越复杂，就越耗时，渲染层就会卡顿，性能不好。

## 思考深复制的原因
wxs函数运行的时候，能拿到渲染数据，如果是值引用的话，有可能在wxs函数运行的时候修改了渲染层的渲染数据，比如说：
```
wxs.func = function(list){
	// 删除原有数组的值
	list.splice(0, 1)
}
```
如果出现这样的情况，那渲染层的渲染数据和逻辑层的渲染数据就对应不上了，所以不能这样是值引用，必须要深复制。

## 解决方案
所以在没有必要的情况下，往wxs函数里面尽量不要传对象，尽量传基本类型的数据。
当前这个场景的解决方案也可以将wxs层的处理放到js层，预处理数据。

代码片段：https://developers.weixin.qq.com/s/hhHT88mB74yi
备注: 代码片段的编译和页面编译不一样，函数名会不一样，$gdc 对应的函数名为K
小程序项目：