import React from "react"
import { config } from "react-transition-group"
import { render, fireEvent, waitFor, RenderResult } from "@testing-library/react"
import { AutoComplete, AutoCompleteProps, DataSourceType } from "./autoComplete"
import { IconProps } from "../Icon/icon"

interface RolesProps {
    [propsName: string]: any
}

config.disabled = true

jest.mock("../Icon/icon", () => {
    return (props: IconProps) => {
        return <span>{props.icon}</span>
    }
})


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

const handleSearch = (value: string) => {
    return likesWithName.filter(role => role.name.includes(value) || role.value.includes(value))
}

const handleRenderOption = (item: DataSourceType) => {
    const role = item as RolesProps
    return <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{role.value}</strong>
        <span>{role.name}</span>
    </div>
}

const handleAsyncSearch = (value: string) => {
    return fetch(`https://api.github.com/search/users?q=${value}`)
        .then(res => res.json())
        .then(() => {
            return [{ value }]
        })
}

const testProps: AutoCompleteProps = {
    placeholder: "搜索你喜爱的斗罗大陆人物",
    dropdownClassName: "custom-dropdown",
    onSearch: handleSearch,
    onSelect: jest.fn(),
}

const testTemplateProps: AutoCompleteProps = {
    placeholder: "custom template",
    onSearch: handleSearch,
    renderOptions: handleRenderOption
}

const testAsyncProps: AutoCompleteProps = {
    placeholder: "search github name",
    onSearch: handleAsyncSearch
}

let wrapper: RenderResult, inputElement: HTMLInputElement;
describe("test AutoComplete Components", () => {
    beforeEach(() => {
        wrapper = render(<AutoComplete {...testProps} />)
        inputElement = wrapper.getByPlaceholderText("搜索你喜爱的斗罗大陆人物") as HTMLInputElement
    })

    it("should render the correct default props", async () => {
        // Act
        fireEvent.change(inputElement, { target: { value: "唐" } })
        await waitFor(() => {
            expect(wrapper.queryByText("唐三")).toBeInTheDocument()
            expect(wrapper.container.querySelector(".custom-dropdown")).toBeInTheDocument()
        })
        // should have tow options item
        expect(wrapper.container.querySelectorAll(".vshark-auto-complete-dropdown-item").length).toBe(2)
        // click first item
        fireEvent.click(wrapper.getByText("唐三"))
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: "唐三", name: "千手斗罗、海神、修罗神" })
    })

    it("support keyboard events", async () => {
        // Act
        fireEvent.change(inputElement, { target: { value: "唐" } })
        await waitFor(() => {
            expect(wrapper.queryByText("唐三")).toBeInTheDocument()
        })
        const firstItem = wrapper.queryByText("唐三")
        const secondItem = wrapper.queryByText("唐昊")
        //arrow down
        fireEvent.keyDown(inputElement, { keyCode: 40 })
        expect(firstItem).toHaveClass("is-active")
        //arrow down
        fireEvent.keyDown(inputElement, { keyCode: 40 })
        expect(secondItem).toHaveClass("is-active")
        // arrow up
        fireEvent.keyDown(inputElement, { keyCode: 38 })
        expect(firstItem).toHaveClass("is-active")
        fireEvent.keyDown(inputElement, { keyCode: 13 })
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: "唐三", name: "千手斗罗、海神、修罗神" })
        expect(wrapper.queryByText("唐三")).not.toBeInTheDocument()
    })

    it("test clickoutside colseable dropdown", async () => {
        fireEvent.change(inputElement, { target: { value: "唐" } })
        await waitFor(() => {
            expect(wrapper.queryByText("唐三")).toBeInTheDocument()
        })
        fireEvent.click(document)
        expect(wrapper.queryByText("唐三")).not.toBeInTheDocument()
    })

    it("renderOptions should generate the right template", async () => {
        const wrapper2 = render(<AutoComplete {...testTemplateProps} />)
        const inputElement2 = wrapper2.getByPlaceholderText("custom template") as HTMLInputElement
        fireEvent.change(inputElement2, { target: { value: "小舞" } })
        await waitFor(() => {
            expect(wrapper2.queryByText("小舞")).toBeInTheDocument()
            expect(wrapper2.queryByText("柔骨斗罗、海神、修罗神")).toBeInTheDocument()
            expect(wrapper2.queryByText("小舞")?.tagName).toEqual("STRONG")
        })
    })

    it('async fetchSuggestions should works fine', async () => {
        window.fetch = jest.fn(() => {
            return Promise.resolve<any>({
                status: 200,
                json: () => {
                    return Promise.resolve<DataSourceType[]>([{
                        value: "visionwuwu"
                    }])
                }
            })
        })

        const wrapper = render(<AutoComplete {...testAsyncProps} />)
        const inputElement = wrapper.getByPlaceholderText("search github name") as HTMLInputElement
        fireEvent.change(inputElement, { target: { value: "visionwuwu" } })
        await waitFor(() => {
            expect(wrapper.queryByText("spinner")).toBeInTheDocument()
        })
        expect(wrapper.queryByText("spinner")).not.toBeInTheDocument()
        await waitFor(() => {
            expect(wrapper.queryByText("visionwuwu")).toBeInTheDocument()
        })
    })
})