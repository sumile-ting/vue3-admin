<!-- add -->
<template>
  <sumile-page-layout title="设备详情" :subTitles="subTitles" :showFooter="false">
    <template #info1>
      <el-form :inline="true" label-width="100px">
        <el-row>
          <el-col :md="12" :xs="24" :xl="8" :lg="8" :sm="12" v-for="(item) in formData">
            <el-form-item
              :label="item.label + ':'"
              :prop="item.name"
              class="no-wrap"
             >
             <el-tooltip
              class="box-item"
              effect="dark"
              :content="item.value"
              placement="bottom"
              :disabled="!tooltip[item.name]"
            >
              <span class="text-line-2" :ref="(el) =>setItemRef(el, item.name)"> {{ item.value }}</span>
            </el-tooltip>

              
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #info2><div>基本信息2XXX</div></template>
    <template #info3><div>基本信息3XXX</div></template>
  </sumile-page-layout>
</template>

<script setup>
import {ref, onMounted, reactive} from 'vue'
const subTitles = [
  {
    name: 'info1',
    label: '基本信息1'
  },
  {
    name: 'info2',
    label: '基本信息2'
  },
  {
    name: 'info3',
    label: '基本信息3'
  }
]

const formData = [
  {
    label: '参数1的名字',
    name: 'params1',
    value: '参数1的值参数1的值参数1的值参数1的值1的值参数1的值1的值参数1的值参数1的值'
  },
  {
    label: '参数2',
    name: 'params2',
    value: '请输入参数2请输入参数2的值请输入参数2的值请输入参数2的值请输入参数2的的值请输入参数2的值请输入参数2的值请输入参数2的值'
  },
  {
    label: '参数3',
    name: 'params3',
    value: '参数3的值'
  },
  {
    label: '参数4',
    name: 'params4',
    value: '参数4的值'
  },
  {
    label: '参数5',
    name: 'params5',
    value: '参数5的值'
  },
  {
    label: '参数6的名字',
    name: 'params6',
    value: '请输入参数6的参数6的参数6的参数6的参数6的的值请输入参数1的值请输入参数1的值请输入参数1的值请输入参数1的值请输入参数1的值请输入参数1的值'
  }
]

/**
 * 默认禁用tooltip
 */
const tooltip = reactive({})
for(let i=0;i<formData.length; i++) {
  tooltip[formData[i].name] = false
}
/**
 * 设置动态ref
 */
const refs = {}
const setItemRef = function (el, ref) {
  refs[ref + 'Ref'] = el
}

/**
 * 超出两行溢出，激活tooltip功能
 */
function setTooltip( ) {
  for(let i=0;i<formData.length; i++) {
    const ref = refs[formData[i].name + 'Ref']
    const range = document.createRange()
    range.setStart(ref, 0)
    range.setEnd(ref, 1)
    const rangeHeight = range.getBoundingClientRect().height
    if(rangeHeight > ref.clientHeight) {
      tooltip[formData[i].name] = true
    }
  }
}

onMounted(() => {
  setTooltip()
})
</script>

<style scoped>
</style>
