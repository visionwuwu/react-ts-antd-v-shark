import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { AutoComplete, AutoCompleteProps, DataSourceType } from "./autoComplete"
import { Icon } from "../Icon/icon"

interface RolesProps {
    [propsName: string]: any
}

export default {
    title: "数据录入/AutoComplete",
    component: AutoComplete,
    parameters: {
        actions: null
    }
} as Meta


const handleSearch = (value: string) => {
    console.log(value)
    // const cssProperties = ["absolute", "center", "bold", "relative", "border", "left", "right", "align"]
    // return cssProperties.filter(item => item.includes(value)).map(name => ({ value: name }))
    return fetch(`https://api.github.com/search/users?q=${value}`)
        .then(res => res.json())
        .then(({ items }) => {
            return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
        })
}

const handleRenderOption = (item: DataSourceType) => {
    return <div>
        <Icon icon="atom" size="sm" theme="info" style={{ marginRight: "15px" }} />
        {item.value}
    </div>
}

export const BaseAutoComplete: Story<AutoCompleteProps> = (args) => {
    return <div style={{ height: "500px" }}>
        <h3>AutoComplete自动完成 <small style={{ color: "gray", fontSize: "1rem" }}>搜索完成后移动上下键可选中</small></h3>
        <AutoComplete
            {...args}
            onSearch={handleSearch}
            suffix="search"
            placeholder="输入GitHub账号名称搜索"
        />
    </div>
}
BaseAutoComplete.storyName = "基础使用"

export const CustomOptionsWithAutoComplete: Story<AutoCompleteProps> = (args) => {
    return <div style={{ height: "500px" }}>
        <h3>自定义选项-带Icon图标</h3>
        <AutoComplete
            {...args}
            onSearch={handleSearch}
            renderOptions={handleRenderOption}
            suffix="search"
            placeholder="输入GitHub账号名称搜索"
        />
    </div>
}
CustomOptionsWithAutoComplete.storyName = "自定义选项"

export const RolesWithAutoComplete: Story<AutoCompleteProps> = (args) => {
    const likesWithName = [
        { name: '千手斗罗、海神、修罗神', value: "唐三" },
        { name: '昊天斗罗', value: "唐昊" },
        { name: '柔骨斗罗、海神、修罗神', value: "小舞" },
        { name: '白虎斗罗、战神', value: "戴沐白" },
        { name: '食神斗罗、食神', value: "奥斯卡" },
        { name: '凤凰斗罗、凤凰之神', value: "马红俊" },
        { name: '九彩斗罗', value: "宁荣荣" },
        { name: '幽冥斗罗', value: "朱竹清" },
        { name: '剑斗罗', value: "尘心" },
        { name: '罗刹神', value: "比比东" },
        { name: '天使之神', value: "千仞雪" }
    ]

    const handleFetch = (value: string) => {
        return likesWithName.filter(role => role.name.includes(value) || role.value.includes(value))
    }

    const handleRenderOption = (item: DataSourceType ) => {
        const role = item as RolesProps
        return <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{ role.value }</strong>
            <span>{role.name}</span>
        </div>
    }

    return <div style={{ height: "500px" }}>
        <h3>搜索你喜爱的斗罗大陆人物</h3>
        <AutoComplete
            {...args}
            placeholder="搜索你喜爱的斗罗大陆人物"
            onSearch={handleFetch}
            renderOptions={handleRenderOption}
            suffix="search"
        />
    </div>
}
RolesWithAutoComplete.storyName = "斗罗大陆人物"