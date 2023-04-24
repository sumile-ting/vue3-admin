import { useTagsStore } from '@/stores/tags.js'
import { useRoute, useRouter } from 'vue-router'
import { useMenusStore } from '@/stores/menus'

export default () => {
  const { setActiveMenuId } = useMenusStore()
  const { tags, setTags } = useTagsStore()
  const route = useRoute()
  const router = useRouter()
  /**
   * 移除tag
   * @param {*} tabName
   */
  const handleRemove = function (tabName) {
    const index = tags.arr.findIndex((item) => item.value === tabName)
    if (index !== -1) {
      tags.arr.splice(index, 1)
      setTags(tags.arr)
      // 设置当前tag为最后一次点击的tag
      if (tabName === route.path) {
        // 如果关闭本标签，则打开最近一次打开的标签
        const tag = tags.arr.reduce(
          (preVal, curVal) => {
            return preVal.meta.order < curVal.meta.order ? curVal : preVal
          },
          { meta: { order: -1 } }
        )
        router.push(tag.value)
      }
    }
  }
  /**
   * 点击tag
   * @param {*} tab
   */
  const handleClick = function (tab) {
    const path = tab.props.name
    const tag = tags.arr.find((item) => item.value === path)
    const { activeMenuId } = useMenusStore()
    // tag的menuId和顶部菜单激活状态的menuId不一致，更新顶部菜单激活状态
    if (tag.meta.menuId && tag.meta.menuId !== activeMenuId) {
      setActiveMenuId(tag.meta.menuId)
    }
    router.push(path)
  }
  // 关闭其它标签
  const closeOther = function () {
    const path = route.path
    tags.arr = tags.arr.filter((item) => item.value === path)
    setTags(tags.arr)
  }
  // 关闭当前标签
  function closeTag () {
    const path = route.path
    handleRemove(path)
  }

  return {
    tags,
    handleRemove,
    handleClick,
    closeOther,
    closeTag
  }
}
