import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { Progress, ProgressProps } from "./progress"

export default {
    title: "反馈/Progress",
    component: Progress
} as Meta

export const BaseProgress: Story<ProgressProps> = (args) => {
    return <>
        <Progress {...args}></Progress>
    </>
}
BaseProgress.storyName = "基础进度条"

export const ProgressWithTheme: Story<ProgressProps> = (args) => {
    return <>
        <Progress {...args} percent={30}></Progress>
        <br />
        <Progress {...args} percent={50} theme="danger"></Progress>
        <br />
        <Progress {...args} percent={70} theme="success"></Progress>
        <br />
        <Progress {...args} percent={100} theme="info"></Progress>
        <br />
        <Progress {...args} percent={50} theme="warning"></Progress>
        <br/>
        <Progress {...args} percent={40} theme="secondary"></Progress>
        <br/>
        <Progress {...args} percent={30} theme="light"></Progress>
        <br/>
        <Progress {...args} percent={80} theme="dark"></Progress>
    </>
}
ProgressWithTheme.storyName = "不同主题"

export const FormatWithProgress: Story<ProgressProps> = (args) => {
    return <>
        <Progress {...args} percent={60} format={(percent) => `${percent}❤`}></Progress>
        <br/>
        <Progress {...args} theme="info" percent={60} format={(percent) => `${percent}🥁`}></Progress>
    </>
}
FormatWithProgress.storyName = "自定义文本格式"
