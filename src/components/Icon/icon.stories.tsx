import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { action } from "@storybook/addon-actions"
import { Icon, IconProps, displayIcons } from "./icon"

export default {
    title: "通用组件/Icon",
    component: Icon,
    argTypes: {
        icon: {
            table: {
                type: {
                    summary: "图标属性IconProp",
                    detail: "更多图标参考：https://github.com/fortAwesome/react-fontawesome#basic"
                }
            }
        },
        style: {
            data: "string"
        }
    }
} as Meta

export const BaseIcon: Story<IconProps> = (args) => {
    return <Icon {...args} icon="coffee" onClick={action("coffee-icons: clicked")}></Icon>
}
BaseIcon.storyName = "基础图标"

export const ThemeIcon: Story<IconProps> = (args) => {
    return <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Icon {...args} icon="coffee" theme="primary" onClick={action("primary: clicked")}></Icon>
        <Icon {...args} icon="blind" theme="secondary" onClick={action("secondary: clicked")}></Icon>
        <Icon {...args} icon="flushed" theme="info" onClick={action("info: clicked")}></Icon>
        <Icon {...args} icon="calendar" theme="success" onClick={action("success: clicked")}></Icon>
        <Icon {...args} icon="car" theme="warning" onClick={action("warning: clicked")}></Icon>
        <Icon {...args} icon="chess-queen" theme="danger" onClick={action("danger: clicked")}></Icon>
        <Icon {...args} icon="clock" theme="light" onClick={action("light: clicked")}></Icon>
        <Icon {...args} icon="compass" theme="dark" onClick={action("dark: clicked")}></Icon>
    </div>
}
ThemeIcon.storyName = "不同主题"

export const IconList: Story<IconProps> = (args) => {
    return <div className="icon-list">
        {
            displayIcons.map((icon, index) => {
                return <div key={index} className="icon-list-item">
                    <Icon {...args} icon={icon} size="3x" onClick={action(`${icon}:clicked`)}></Icon>
                    <p style={{ fontSize: "1rem" }}>{icon}</p>
                </div>
            })
        }
    </div>
}
IconList.storyName = "图标列表"
IconList.parameters = {
    docs: {
        source: {
            disabled: true,
            code: "不展示代码",
        },
        description: {
            story: '仅仅展示100个免费图标，如果想知道更多图标请访问: <a href="https://fontawesome.com/icons?d=listing&s=solid&m=free" target="_blank">fontawesome</a>'
        }
    },
}

