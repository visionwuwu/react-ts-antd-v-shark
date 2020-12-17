import React from "react"
import { action } from "@storybook/addon-actions"
import { Meta, Story } from "@storybook/react/types-6-0"
import Button, { ButtonProps } from "./button"

export default {
    title: "通用组件/Button",
    component: Button,
    argTypes: {
        href: {
            table: {
                type: {
                    summary: "参考示例",
                    detail: "百度一下：<a href='https://www.baidu.com'>百度</a>"
                }
            }
        }
    }
} as Meta


export const Default: Story<ButtonProps> = (args) => (
    <Button {...args}>default</Button>
)
Default.storyName = "默认"

export const ButtonWithSize: Story<ButtonProps> = (args) => (
    <>
        <Button {...args} style={{ margin: "0 10px" }} icon="upload" btnType="default" size="sm" onClick={action("small: clicked")}>small</Button>
        <Button {...args} style={{ margin: "0 10px" }} icon="upload" btnType="default" onClick={action("default: clicked")}>default</Button>
        <Button {...args} style={{ margin: "0 10px" }} icon="upload" btnType="default" size="lg" onClick={action("large: clicked")}>large</Button>
    </>
)
ButtonWithSize.storyName = "不同尺寸"

export const ButtonWithType: Story<ButtonProps> = (args) => (
    <>
        <Button {...args} icon="upload" style={{ margin: "0 10px" }} btnType="default" onClick={action("default: clicked")}>default</Button>
        <Button {...args} icon="upload" style={{ margin: "0 10px" }} btnType="primary" onClick={action("primary: clicked" )}>primary</Button>
        <Button {...args} icon="upload" style={{ margin: "0 10px" }} btnType="danger" onClick={action("danger: clicked")}>danger</Button>
        <Button {...args} style={{ margin: "0 10px" }} btnType="link" href="https://www.baidu.com">link</Button>
    </>
)
ButtonWithType.storyName = "不同类型"

export const IconWithButton: Story<ButtonProps> = (args) => {
    return <>
        <Button {...args} className="mx-1" icon="search" btnType="default" />
        <Button {...args} className="mx-1" icon="search" btnType="primary" />
        <Button {...args} className="mx-1" icon="search" btnType="danger" />
    </>
}
IconWithButton.storyName = "图标按钮"

export const ButtonWithDisabled: Story<ButtonProps> = (args) => (
    <>
        <Button {...args} style={{ margin: "0 10px" }} btnType="default" onClick={action("default: clicked")}>default</Button>
        <Button {...args} style={{ margin: "0 10px" }} disabled btnType="default" onClick={action("default: disabled")}>disabled</Button>
    </>
)
ButtonWithDisabled.storyName = "禁用状态"