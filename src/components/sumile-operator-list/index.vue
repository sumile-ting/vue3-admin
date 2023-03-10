<!-- 表格中的操作列，超过三个按钮显示more按钮，悬停在more按钮上显示剩余按钮 -->
<template>
  <template v-for="operator in defaultList">
    <el-tooltip effect="dark" :content="operator.label" placement="bottom">
      <el-button :type="operator.type" size="small" :icon="operator.icon" :disabled="operator.disabled" text class="sumile-operator-btn"
        @click="handleClick(operator.operator)"></el-button>
    </el-tooltip>
  </template>
  <el-popover
    placement="bottom"
    width="auto"
    :popper-style="{padding: '5px', minWidth: 'auto'}"
    trigger="hover"
    :show-arrow="false"
    v-if="showList.length > 4"
  >
    <template v-for="operator in showList.slice(4)">
      <el-tooltip effect="dark" :content="operator.label" placement="bottom">
        <el-button :type="operator.type" size="small" :icon="operator.icon" :disabled="operator.disabled" text class="sumile-operator-btn"
          @click="handleClick(operator.operator)"></el-button>
      </el-tooltip>
    </template>
      <template #reference>
        <el-button type="primary" size="small" icon="MoreFilled" text class="sumile-operator-btn" v-if="operators.length > 4"></el-button>
      </template>
  </el-popover>
  
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  operators: {
    type: Array,
    default: () => [],
    required: true
  }

})

const showList = computed(() => {
  return props.operators.filter(item => item.show !== false)
})

const defaultList = computed(() => {
  if(showList.value.length > 4) {
    return showList.value.slice(0, 3)
  }
  return showList.value
})

const emit = defineEmits(['click'])

function handleClick (type) {
  emit('click', type)
}

</script>

<style scoped></style>
