export default (listWrap, list) => {
  const viewData = reactive({
    list: [],
    total: 1000, // 数据总条数
    height: 400, // 可视区域的高度
    rowHeight: 50, // 每条item的高度
    startIndex: 0, // 初始位置
    endIndex: 0, // 结束位置
    timer: false,
    bufferSize: 5 // 做一个缓冲

  })

  const renderData = () => {
    viewData.list = []
    const { rowHeight, height, startIndex, total, bufferSize } = viewData
    // 当前可视区域的row条数
    const limit = Math.ceil(height / rowHeight)
    // 可视区域的最后一个位置
    viewData.endIndex = Math.min(startIndex + limit + bufferSize, total)
    for (let i = startIndex; i < viewData.endIndex; i++) {
      viewData.list.push({
        content: list[i],
        style: {
          top: `${i * rowHeight}px`
        }
      })
    }
  }
  const handleScroll = (callback) => {
  // console.log(listWrap.value)
    listWrap.value && listWrap.value.addEventListener('scroll', (e) => {
      if (viewData.timer) {
        return
      }
      const { rowHeight, startIndex, bufferSize } = viewData
      const { scrollTop } = e.target
      // 计算当前滚动的位置，获取当前开始的起始位置
      const currentIndex = Math.floor(scrollTop / rowHeight)
      viewData.timer = true
      // console.log(startIndex, currentIndex);
      // 做一个简单的节流处理
      setTimeout(() => {
        viewData.timer = false
        // 如果滑动的位置不是当前位置
        if (currentIndex !== startIndex) {
          viewData.startIndex = Math.max(currentIndex - bufferSize, 0)
          callback()
        }
      })
    })
  }
  return {
    viewData,
    renderData,
    handleScroll
  }
}
