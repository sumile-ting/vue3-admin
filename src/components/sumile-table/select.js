import { ref } from 'vue'
export default (rowKey = 'id', tableRef) => {
  const selected = ref([])
  function selectionChange (val) {
    selected.value = val
  }

  function clearSelection () {
    tableRef.value.clearSelection()
  }
  return {
    selected,
    selectionChange,
    clearSelection
  }
}
