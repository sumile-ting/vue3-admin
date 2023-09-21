<!--  -->
<template>
  <BasicContainer>
    <div slot="top">虚拟列表</div>
    <div class="virtual-list-wrapper" ref="listWrap">
      <div class="content" ref="content" :style="contentStyle">
        <div v-for="row in viewData.list" :key="row.index" class="row" :style="row.style">
          <div>{{ row.content.name }}</div>
          <div>{{ row.content.age }}</div>
          <div>{{ row.content.address }}</div>
        </div>
      </div>
    </div>
  </BasicContainer>
</template>

<script setup>
import useVirtualList from './virtualScroll'
const list = Array.from({ length: 1000 }).map((_, index) => {
  return {
    id: index,
    name: '测试' + index,
    age: index % 2 ? '女' : '男',
    address: '的打发十分噶'
  }
})

const listWrap = ref(null);

const contentStyle = computed(() => {
  return {
    height: `${viewData.total * viewData.rowHeight}px`,
    position: 'relative',
  }
});

const {viewData, renderData, handleScroll} = useVirtualList(listWrap, list)

onMounted(() => {
  renderData();
  handleScroll(renderData);
})
</script>

<style scoped>
.virtual-list-wrapper {
  height: 400px;
  overflow-y: auto;
  position: relative;
  border: 1px solid #ccc;
}

.content {
  position: relative;
}

.row {
  line-height: 50px;
  height: 50px;
  padding: 10px 5px;
  border-bottom: 1px solid #ccc;
  position: absolute;
  left:0;
  right: 0;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  box-sizing: border-box;
  align-items: center;
}
</style>
