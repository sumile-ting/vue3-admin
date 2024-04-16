<!-- 公共的页面布局，上面显示搜索面板，下面显示表格 -->
<template>
  <div class="sumile-basic-container">
    <!-- 顶部插槽 -->
    <el-card class="sumile-basic-container--top h-43px mb-15px px-13px" style="border-radius: 6px;" :body-style="{padding: 0}" v-if="$slots.top">
      <slot name="top"></slot>
    </el-card>
    <!-- 布局中央 -->
    <div class="sumile-basic-container--bottom h-100% flex overflow-hidden">
      <!-- 下方左侧插槽 -->
      <el-card class="sumile-basic-container--aside w-260px mr-15px mb-15px" v-if="$slots.aside" :body-style="{padding: '10px', height: '100%'}">
        <slot name="aside"></slot>
      </el-card>
      <div class="sumile-basic-container--content flex-1 flex flex-col overflow-hidden">
        <!-- 表格上方搜索栏插槽 -->
        <slot name="search"></slot>

        <div class="sumile-basic-container-table">
          <!-- 表格上方操作插槽 -->
          <div class="sumile-basic-container-table-operator" v-if="$slots.operator">
            <slot name="operator"></slot>
          </div>
          <!-- 表格区域插槽 -->
          <template v-if="$slots.default">
            <div class="sumile-table-container" :style="{ height: $slots.operator ? 'calc(100% - 44px)' : '100%'}">
              <slot></slot>
            </div>
          </template>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>

</script>

<style scoped></style>
