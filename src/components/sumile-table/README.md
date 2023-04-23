# sumile-table
----
基于el-table封装的表格组件
### 封装说明
----
基于el-table，封装了分页组件和表格信息栏进去，使用时无需关心分页逻辑
### 属性说明 
除去el-table自带属性，还支持以下属性 
| 属性名       | 说明                                                           | 默认值  |
| ------------ | -------------------------------------------------------------- | ------- |
| pagination   | 是否显示分页                                                   | true    |
| pageSize     | 每页显示条数                                                   | 20      |
| columns      | 根据此字段渲染表格列, columns属性配置和el-table-column属性相同 | []      |
| requestApi   | 加载表格数据方法 必须为 `Promise` 对象 **必须绑定**            | Promise |
| showAlert    | 设置是否显示表格信息栏                                         | true    |
| dataCallBack | 对后台返回的数据进行数据处理的方法                             | null    |
### columns配置说明
除去el-table-column自带属性，还支持以下属性：
- slot: 布尔值，非必选，默认未否，是否对此列使用插槽，插槽名称为column.name
- headerSlot: 布尔值，非必选，默认未否，是否对此列的表头使用插槽，插槽名称为column.name + 'Header'
### 插槽说明
除了el-table自带插槽外，还支持以下插槽：
- 列属性slot为true时，可使用插槽名称为column.name的插槽自定义列内容
- 列属性headerSlot为true时，可使用插槽名称为column.name + 'Header'的插槽自定义列头
- tableHeader插槽，可自定义表格上方的内容，如表格的操作按钮
### Demo
```javascript
    <sumile-table :columns="columns" :requestApi="getTableData" ref="myTable">
    
      <template #tableHeader="scope">
        <el-button type="primary" icon="Plus" @click="onAdd">新增</el-button>
        <el-button type="primary" icon="Upload" plain>导入</el-button>
        <el-button type="danger" icon="Delete" plain @click="onDelete(scope.selectedList)" :disabled="!scope.selectedList.length">删除</el-button>
      </template>
      <template #status="{row}">
        <sumile-status-column type="primary" :color="statusColor(row.status)">{{ statusFilter(row.status) }}</sumile-status-column>
      </template>
      <template #process="{row}">
        <el-progress :percentage="row.process" />
      </template>
      <template #operation="{row}">
        <sumile-operator-list :operators="operatorList(row.status)" @click="handleClick"></sumile-operator-list>
      </template>
    </sumile-table>

    // 表格列定义
const columns = [
  {
    type: 'selection'
  },
  {
    label: '公司',
    prop: 'company',
    width: 150
  },
  {
    label: '内容',
    prop: 'content',
  },
  {
    label: '日期',
    prop: 'date',
    width: 150
  },
  {
    label: '地址',
    prop: 'address',
    width: 200
  },
  {
    label: '状态',
    prop: 'status',
    width: '120',
    slot: true
  },
  {
    label: '进度',
    prop: 'process',
    width: '150',
    slot: true
  },
{
    label: '操作',
    prop: 'operation',
    width: '160',
    slot: true
  },
]
const { proxy } = getCurrentInstance();

// 获取表格数据
function getTableData () {
  const params = {
    ...searchForm.value
  }
  return proxy.$get(`/api/${import.meta.env.VITE_REQUEST_PREFIX}-companies/page`, params)
}
```