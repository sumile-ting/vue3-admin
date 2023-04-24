<!--  -->
<template>
  <el-card  class="sumile-basic-card">
    <template #header v-if="props.title">
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <div class="sumile-basic-card--container" :style="{height: contentHeight}">
      <slot v-if="!subTitles.length"></slot>
      <template v-else>
        <template v-for="(item, index) in subTitles" :key="item.name">
          <div class="sumile-basic-card--head">{{ item.label }}</div>
          <div class="sumile-basic-card--content"><slot :name="item.name"></slot></div>
          
        </template>
      </template>
    </div>

    <div v-if="showFooter" class="footer">
      <el-button class="min-w-82px" @click="cancel">取消</el-button>
      <el-button type="primary" class="min-w-82px" @click="confirm">{{confirmButtunText}}</el-button>
    </div>
  </el-card>
</template>

<script setup>
import {computed} from 'vue'
import useTag from '@/views/layout/top/tags.js'
const emits = defineEmits(['cancel', 'confirm'])
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  confirmButtunText: {
    type: String,
    default: '提交'
  },
  subTitles: {
    type: Array,
    default: () => []
  }

})

// 内容区域的高度
const contentHeight = computed(() => {
  if(!props.showFooter) {
    return '100%'
  } else {
    return 'calc(100% - 50px)'
  }
})

const {closeTag} = useTag()

const cancel = function () {
  closeTag()
  emits('cancel')
}

const confirm = function () {
  closeTag()
  emits('confirm')
}

</script>

<style scoped>
.sumile-basic-card {
    display: flex;
    flex-direction: column;
}
.sumile-basic-card:deep(>.el-card__header) {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 18px;
    background: rgba(0,0,0,0.02);
}
.sumile-basic-card:deep(>.el-card__body) {
  flex: 1;
  overflow: hidden;
}
.sumile-basic-card:deep(>.el-card__body>.footer) {
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: calc(100% - var(--el-card-padding)*2);
    text-align: right;
    border-top: 1px solid var(--el-card-border-color);
    padding-top: 15px;
}
.sumile-basic-card .sumile-basic-card--container {
  overflow-y: auto;
  height: 100%;
}
.sumile-basic-card--head {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC, Noto Sans SC;
  font-weight: 600;
  color: rgba(0,0,0,0.85);
  line-height: 24px;
  border-bottom: 1px solid var(--el-card-border-color);
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.sumile-basic-card--head::before {
  content: ' ';
  display: inline-block;
  width: 4px;
  height: 14px;
  background: #5682DC;
  margin-right: 8px;
  top: 1px;
  position: relative;
}
.sumile-basic-card--content {
  margin-bottom: 15px;
}
</style>
