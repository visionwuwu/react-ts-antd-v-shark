import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { action } from "@storybook/addon-actions"
import Menu from "./index"
import { MenuProps } from "./menu"

export default {
    title: "导航组件/Menu",
    component: Menu
} as Meta

export const HorizontalMenu: Story<MenuProps> = (args) => {
    return <Menu {...args} defaultIndex="2" onSelect={action("Horizontal Menu.Item: clicked")}>
        <Menu.Item>item1</Menu.Item>
        <Menu.Item disabled>item2</Menu.Item>
        <Menu.Item>item3</Menu.Item>
        <Menu.Item>item4</Menu.Item>
    </Menu>
}
HorizontalMenu.storyName = "水平菜单"

export const VerticalMenu: Story<MenuProps> = (args) => {
    return <Menu {...args} mode="vertical" onSelect={action("Vertical Menu.Item: clicked")}>
        <Menu.Item>item1</Menu.Item>
        <Menu.Item disabled>item2</Menu.Item>
        <Menu.Item>item3</Menu.Item>
        <Menu.Item>item4</Menu.Item>
    </Menu>
}
VerticalMenu.storyName = "垂直菜单"

export const HorizontalSubMenu: Story<MenuProps> = (args) => {
    return <div style={{ height: "300px" }}>
        <Menu {...args} onSelect={action("Horizontal SubMenu: clicked")}>
            <Menu.Item>item1</Menu.Item>
            <Menu.Item disabled>item2</Menu.Item>
            <Menu.SubMenu title="this submenu 3 title">
                <Menu.Item disabled>item3-1</Menu.Item>
                <Menu.Item>item3-2</Menu.Item>
                <Menu.Item>item3-3</Menu.Item>
                <Menu.Item>item3-4</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item>item4</Menu.Item>
            <Menu.Item>item5</Menu.Item>
        </Menu>
    </div>
}
HorizontalSubMenu.storyName = "水平子菜单"

export const VerticalSubMenu: Story<MenuProps> = (args) => {
    return <Menu {...args} mode="vertical" defaultOpenSubMenus={["2"]} onSelect={action("Vertical SubMenu: clicked")}>
        <Menu.Item>item1</Menu.Item>
        <Menu.Item disabled>item2</Menu.Item>
        <Menu.SubMenu title="this submenu 3 title">
            <Menu.Item>item3-1</Menu.Item>
            <Menu.Item>item3-2</Menu.Item>
            <Menu.Item>item3-3</Menu.Item>
            <Menu.Item>item3-4</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>item4</Menu.Item>
        <Menu.Item>item5</Menu.Item>
    </Menu>
}
VerticalSubMenu.storyName = "垂直子菜单"


export const WithIconSubMenu: Story<MenuProps> = (args) => {
    return <div style={{ height: "300px" }}>
        <Menu {...args} mode="horizontal" onSelect={action("WithIcon SubMenu: Clicked")}>
            <Menu.Item icon="backspace">item1</Menu.Item>
            <Menu.Item icon="balance-scale">item2</Menu.Item>
            <Menu.SubMenu icon="apple-alt" title="this item3 is submenu">
                <Menu.Item icon="comment-dollar">item3-1</Menu.Item>
                <Menu.Item>item3-2</Menu.Item>
                <Menu.Item>item3-3</Menu.Item>
                <Menu.Item>item3-4</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item>item3</Menu.Item>
        </Menu>
    </div>
}
WithIconSubMenu.storyName = "含有图标"

