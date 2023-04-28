<!--  -->
<template>
  <div class="sumile-tree h-100%">
    <el-input v-model="filterText" placeholder="请输入" :suffix-icon="Search" v-if="props.filterable" class="mb-10px"/>
    <el-scrollbar :height="props.filterable ? 'calc(100% - 42px)' : 'calc(100% - 12px)'" class="sumile-scrollbar-hidden">
      <el-tree 
        ref="treeRef" 
        v-bind="$attrs" 
        :props="treeDefaultProps" 
        :filter-node-method="filterNode" 
        :expand-on-click-node="false"
        default-expand-all 
        @node-click="handleNodeClick" 
        highlight-current
      >
        <template #default="{ node, data }">
          <div class="text-ellipsis overflow-hidden flex-1" @mouseenter="showToolTip($event, node)">
            <template v-if="node.level === 1">
              <el-icon class="mr-5px top-2px relative">
                <Folder />
              </el-icon>
            </template>

            <template v-if="node.level !== 1 && !node.isLeaf">
              <el-icon class="mr-5px top-2px relative">
                <Document />
              </el-icon>
            </template>
            <el-tooltip :content="node.label" placement="bottom" :disabled="!node.showToolTip">
              {{ node.label }}
            </el-tooltip>
            
          </div>
          <el-popover
            placement="bottom-start"
            :width="props.popoverWidth"
            trigger="click"
          >
            <template #reference>
              <el-icon v-if="props.editable" class="flex-shrink-0 ml-10px w-14px h-14px"><MoreFilled /></el-icon>
            </template>
            <div class="tree-operator-panel">
              <div class="tree-operator-list" @click="handleAdd(node, data)">{{props.popoverAddText}}</div>
              <div class="tree-operator-list" @click="handleEdit(node, data)">{{props.popoverEditText}}</div>
              <slot name="operators" :node="node" :data="data"></slot>
            </div>
          </el-popover>
          
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { Search, Folder, Document, MoreFilled } from '@element-plus/icons-vue'

const emits = defineEmits(['node-click', 'add-node', 'edit-node'])

const props = defineProps({
  filterable: {
    default: true,
    type: Boolean
  },
  editable: {
    default: false,
    type: Boolean
  },
  popoverWidth: {
    type: Number,
    default: 120
  },
  popoverAddText: {
    type: String,
    default: '添加'
  },
  popoverEditText: {
    type: String,
    default: '编辑'
  }
})

const showToolTip = function(event, item) {
  const offset = !item.isLeaf ? 16 : 0
  item.showToolTip = event.target.offsetWidth - offset < event.target.querySelector('.el-only-child__content').offsetWidth
}

const filterText = ref('')
const treeRef = ref()
watch(filterText, (val) => {
  treeRef.value.filter(val)
})

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

const customNodeClass = (data, node) => {
  if (node.level === 1) {
    return 'is-top-level'
  }
  return null
}

const attrs = useAttrs()

const treeDefaultProps = {
  children: 'children',
  label: 'label',
  class: customNodeClass,
  ...attrs.props
}

/**
 * 点击树节点
 */
function handleNodeClick (node) {
  emits('node-click', node)
}

/**
 * 添加节点
 */
function handleAdd(node, data) {
  emits('add-node', node)
}

/**
 * 修改节点
 * @param {*} node 
 * @param {*} data 
 */
function handleEdit(node, data) {
  emits('edit-node', node)
}
</script>

<style scoped>
.sumile-tree :deep(.is-top-level>.el-tree-node__content .el-tree-node__label) {
  font-weight: 500;
  color: rgba(0, 0, 0, .85);
}

.sumile-tree .sumile-scrollbar-hidden:deep(.el-scrollbar__thumb) {
  display: none;
}
.tree-operator-panel .tree-operator-list {
  line-height: 2;
}
.tree-operator-panel .tree-operator-list:hover {
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
