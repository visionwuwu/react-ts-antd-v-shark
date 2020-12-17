import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { Input, InputProps } from "./input"
import { Icon } from "../Icon/icon"
import { action } from "@storybook/addon-actions"

export default {
    title: "数据录入/Input",
    component: Input
} as Meta

export const BaseInput: Story<InputProps> = (args) => {
    return (
        <Input
            {...args}
            placeholder="default input"
            // defaultValue="匆匆那年"
            value="花开那年"
            prefix="apple-alt"
            suffix="search"
            onChange={action("input: change")}
        ></Input>
    )
}
BaseInput.storyName = "基本使用"

export const InputWithSize: Story<InputProps> = (args) => {
    return <div>
        <Input {...args} prefix="user" size="sm" placeholder="small input" />
        <br />
        <Input {...args} prefix="user" size="default" placeholder="default input" />
        <br />
        <Input {...args} prefix="user" size="lg" placeholder="large input" />
    </div>
}
InputWithSize.storyName = "不同大小"

export const InputWithGroup: Story<InputProps> = (args) => {
    return <>
        <Input {...args} prepend={ <Icon icon="search" /> } placeholder="input prepend" />
        <br />
        <Input {...args} append={ <Icon icon="angry" /> } placeholder="input append" />
        <br />
        <Input {...args} prepend="https://" append=".com" placeholder="mysite" />
    </>
}
InputWithGroup.storyName = "前置与后置标签"

export const InputWithIcon: Story<InputProps> = (args) => {
    return <>
        <Input {...args} prefix="apple-alt" placeholder="input prefix" />
        <br />
        <Input {...args} suffix="baby-carriage" placeholder="input suffix" />
        <br />
        <Input {...args} prefix="arrow-circle-left" suffix="arrow-circle-right" placeholder="input affix" />
    </>

}
InputWithIcon.storyName = "前缀与后缀图标"

export const InputWithClear: Story<InputProps> = (args) => {
    return <>
        <Input {...args} size="sm" suffix="search-dollar" allowClear placeholder="input with clear icon"  />
        <br />
        <Input {...args} size="default" suffix="search-dollar" allowClear placeholder="input with clear icon"  />
        <br />
        <Input {...args} size="lg" suffix="search-dollar" allowClear placeholder="input with clear icon"  />
    </>
}
InputWithClear.storyName = "带清空图标"

export const InputWithDisabled: Story<InputProps> = (args) => {
    return <>
        <Input {...args} size="sm" suffix="camera" disabled placeholder="small input disabled" />
        <br />
        <Input {...args} size="default" suffix="camera" disabled placeholder="default input disabled" />
        <br />
        <Input {...args} size="lg" suffix="camera" disabled placeholder="large input disabled" />
    </>
}
InputWithDisabled.storyName = "禁用状态"