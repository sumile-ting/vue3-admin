import {reactive, ref} from 'vue'
export default (requestApi, dataCallBack, pagination, pageSize) => {
  const page = reactive({ currentPage: 1, pageSize: pageSize })
  const tableData = ref({ total: 0, records: [] })

  // 获取表格数据
  async function getTableData() {
    const params = !pagination ? {} : JSON.parse(JSON.stringify(page))
    let { data } = await requestApi(params)
    data = dataCallBack ? dataCallBack(data.data) : data.data
    tableData.value = data
  }

  //每页条数发生变化
  function handleSizeChange(val) {
    page.pageSize = val
    getTableData()
  }
  
  //当前页发生变化
  function handleCurrentChange(val) {
    page.currentPage = val
    getTableData()
  }

  return {
    page,
    tableData,
    getTableData,
    handleSizeChange,
    handleCurrentChange

  }
}