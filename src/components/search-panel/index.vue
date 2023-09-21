<!-- 自适应的公共查询Panel -->
<template>
    <div class="sumile-basic-container-search">
      <el-form :inline="true" :model="props.model" class="sumile-search-form">
        <el-row>
          <template v-for="(item, index) in option.columns">
            <el-col :md="12" :xs="24" :xl="6" :lg="6" :sm="12" v-if="!isExpand ? index < 3 : true">
              <el-form-item :label="item.label">
                <template v-if="item.type === 'input'">
                  <el-input v-model="props.model[item.prop]" :placeholder="'请输入' + item.label" />
                </template>
                <template v-else-if="item.type === 'select'">
                  <el-select v-model="props.model[item.prop]" :placeholder="'请选择' + item.label" style="width: 100%">
                    <el-option 
                      v-for="select in item.dictData"       
                      :key="item.props ? select[item.props.value] : select.value"
                      :label="item.props ? select[item.props.label] :select.label"
                      :value="item.props ? select[item.props.value] :select.value">
                    </el-option>
                  </el-select>
                </template>
                <template  v-else-if="item.type === 'datepicker'">
                  <el-date-picker
                    v-model="props.model[item.prop]"
                    v-bind="item.props"
                    type="date"
                    style="width: 100%;display: flex;"
                    :placeholder="'请选择' + item.label">
                  </el-date-picker>
                </template>
                <template v-else-if="item.type === 'tree'">
                  <el-tree-select 
                    v-model="props.model[item.prop]"
                    v-bind="item.props" 
                    style="width: 100%"
                    :data="item.dictData" 
                    filterable />
                </template>
                <template v-if="item.slot">
                  <slot :name="item.prop" :placeholder="item.placeholder || '请输入' + item.label"></slot>
                </template>
              </el-form-item>

            </el-col>
          </template>
          <el-col :md="searchBtnMd" :xs="24" :xl="searchBtnLg" :lg="searchBtnLg" :sm="searchBtnMd">
            <el-form-item class="search-btn">
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button @click="onReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="sumile-search-expand" v-if="option.columns.length > 3">
        <el-tooltip :content="isExpand ? '收缩': '展开'">
          <el-icon @click="onExpand">
            <ArrowUp v-if="isExpand"/>
            <ArrowDown v-else/>
          </el-icon>
        </el-tooltip>
        
      </div>
    </div>

</template>

<script setup>
import { reactive, ref, computed, getCurrentInstance } from 'vue'
import {
  ArrowUp, ArrowDown
} from '@element-plus/icons-vue'

// 组件属性定义
const props = defineProps({
  option: {
    type: Object,
    default: () => ({columns: []})
  },
  model: {
    type: Object,
    default: () => {}
  }
})

// 广播事件
const emit = defineEmits(['query-change'])

const { proxy } = getCurrentInstance();

const propsLength = props.option.columns.length

//默认展开还是收缩
const isExpand = ref(false)
// 点击收缩展开按钮
const onExpand = function() {
  isExpand.value = !isExpand.value
}
// 自适应查询按钮占比
const searchBtnLg = computed(() => {
  if(propsLength < 4) {
    return (4 - propsLength) * 6
  }
  if(!isExpand.value) {
    return 6
  }
  return (4 - propsLength % 4) * 6
})
// 自适应查询按钮占比
const searchBtnMd = computed(() => {
  if(propsLength < 2 || !isExpand.value) {
    return  12
  }
  return (2 - propsLength % 2) * 12
})

// 发起请求获取数据字典
for(let i = 0; i < propsLength; i++) {
  if( props.option.columns[i].dictUrl) {
    let index = i
    proxy.$get(`${props.option.columns[index].dictUrl}`).then(({data}) => {
      props.option.columns[index].dictData = data.data
    })
  }
}

/**
 * 查询
 */
const onSubmit = () => {
  emit('query-change', props.model, 'query')
}

/**
 * 重置
 */
const onReset = () => {
  for(let key in props.model ) {
    props.model[key] = ''
  }
  emit('query-change', props.model, 'reset')
}
</script>

<style scoped>
.search-btn:deep(.el-form-item__content) {
  justify-content: flex-end;
}
</style>
