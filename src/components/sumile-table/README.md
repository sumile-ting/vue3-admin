# sumile-table
----
### 封装说明
----
基于el-table，封装了分页组件和表格信息栏进去，使用时无需关心分页逻辑
### 属性说明 
除去el-table自带属性，还支持以下属性 
|   属性名       | 说明             |         默认值                  |
|    ---         |  ---             |             ---                 |
|   pagination   | 是否显示分页     |         true                    |
|   pageSize     |  每页显示条数           |           20              |
|   columns     |  根据此字段渲染表格列, columns属性配置和el-table-column属性相同    |           []              |
|   requestApi     |  加载表格数据方法 必须为 `Promise` 对象 **必须绑定**           |          Promise            |
|   showAlert     |  设置是否显示表格信息栏          |          true            |
|   dataCallBack     |  对后台返回的数据进行数据处理的方法           |          null            |
### columns配置说明
除去el-table-column自带属性，还支持以下属性：
- slot: 布尔值，非必选，默认未否，是否对此列使用插槽，插槽名称为column.name
- headerSlot: 布尔值，非必选，默认未否，是否对此列的表头使用插槽，插槽名称为column.name + 'Header'
### 插槽说明