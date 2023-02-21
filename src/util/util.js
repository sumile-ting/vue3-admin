/**
 * 递归查找叶子节点的path
 */
export function getLeafPath (menus) {
  if (!menus || !menus.length) {
    return ''
  }
  if (!menus[0].children || !menus[0].children.length) {
    return menus[0].path
  }
  return getLeafPath(menus[0].children)
}
