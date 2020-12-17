import { FC } from "react"
import Menu, { MenuProps } from "./menu"
import MenuItem, { MenuItemProps } from "./menuItem"
import SubMenu, { SubMenuItemProps } from "./subMenuItem"

declare type IMenuProps = FC<MenuProps> & {
    Item: FC<MenuItemProps>,
    SubMenu: FC<SubMenuItemProps>
}

const TransComponent = Menu as IMenuProps

TransComponent.Item = MenuItem

TransComponent.SubMenu = SubMenu

export default TransComponent


