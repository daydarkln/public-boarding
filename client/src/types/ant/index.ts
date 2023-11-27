export interface MenuDataItem {
  /** @name submenu */
  routes?: MenuDataItem[]
  /** @name Hide child nodes in the menu */
  hideChildrenInMenu?: boolean
  /** @name hideSelf and children in menu */
  hideInMenu?: boolean
  /** @name Icon of the menu */
  icon?: React.ReactNode
  /** @name Internationalization key for custom menus */
  locale?: string | false
  /** @name The name of the menu */
  name?: string
  /** @name is used to calibrate the selected value, default is path */
  key?: string
  /** @name disable menu option */
  disabled?: boolean
  /** @name path */
  path?: string
  /**
   * When this node is selected, the node of parentKeys is also selected
   *
   * @name custom parent node
   */
  parentKeys?: string[]
  /** @name hides itself and elevates child nodes to its level */
  flatMenu?: boolean

  [key: string]: any
}
