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

/**
 * 根据path获取顶层节点
 */
export function findRootNodeByPath (nodes, targetPath) {
  return nodes.find(node => findNodeByPath(node, targetPath))
}

// 辅助函数，用于找到节点的根节点
function findNodeByPath (node, targetPath) {
  if (node.path === targetPath) {
    return true
  }
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      const findNode = findNodeByPath(child, targetPath)
      if (findNode) {
        return true
      }
    }
    return false
  }
}
