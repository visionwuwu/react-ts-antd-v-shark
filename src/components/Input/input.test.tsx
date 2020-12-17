import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import { Input, InputProps } from "./input"

// jest.mock("../Icon/icon", () => {
//     return () => {
//         return <i className="ad"></i>
//     }
// })

const testDefaultProps: InputProps = {
    defaultValue: "那些年",
    value: "花开那年",
    className: "input-container",
    onChange: jest.fn()
}

const testClearProps:InputProps = {
    value: "旅程",
    allowClear: true,
    onClear: jest.fn()
}

const testDisabledProps:InputProps = {
    value: "白日梦想家",
    allowClear: true,
    disabled: true,
    onChange: jest.fn()
}

beforeEach(cleanup)

describe("test Input Component", () => {
    it("should render the correct default props", () => {
        // Arrange
        const { getByTestId, container } = render(<Input {...testDefaultProps} />)
        const elementWrapper = getByTestId("input-component")
        const inputElement = container.querySelector("input") as HTMLInputElement

        // Assert
        expect(elementWrapper).toBeInTheDocument()
        expect(inputElement).toBeInTheDocument()
        expect(elementWrapper).toHaveClass("input-container vshark-input-wrapper input-size-default")
        expect(inputElement.value).toEqual("花开那年")

        // Act
        fireEvent.change(inputElement, { target: { value: "匆匆那年" } })

        // Assert
        expect(inputElement.value).toEqual("匆匆那年")
    })

    it("should render the different size input by the size props", () => {
        // Arrange
        const { getByPlaceholderText } = render(<>
            <Input {...testDefaultProps} size="sm" placeholder="small input" />
            <Input {...testDefaultProps} size="default" placeholder="default input" />
            <Input {...testDefaultProps} size="lg" placeholder="large input" />
        </>)
        const smallInput = getByPlaceholderText("small input") as HTMLInputElement
        const defaultInput = getByPlaceholderText("default input") as HTMLInputElement
        const largeInput = getByPlaceholderText("large input") as HTMLInputElement
        
        // Assert
        expect(smallInput).toBeInTheDocument()
        expect(defaultInput).toBeInTheDocument()
        expect(largeInput).toBeInTheDocument()
        expect(smallInput.tagName).toEqual("INPUT")
        expect(defaultInput.tagName).toEqual("INPUT")
        expect(largeInput.tagName).toEqual("INPUT")
        expect(smallInput.closest(".vshark-input-wrapper")).toHaveClass("input-size-sm")
        expect(defaultInput.closest(".vshark-input-wrapper")).toHaveClass("input-size-default")
        expect(largeInput.closest(".vshark-input-wrapper")).toHaveClass("input-size-lg")
    })


    it("Passing the `prepend` `append` `prefix` `suffix` property should render the corresponding tag", () => {
        // Arrange
        const { container } = render(<>
            <Input className="input-prepend-append" prepend="https://" append=".com" placeholder="mysite" />
            <Input className="input-prefix-suffix" prefix="arrow-circle-left" suffix="arrow-circle-right" placeholder="input affix" />
        </>)
        const inputEndElement = container.querySelector(".input-prepend-append")
        const inputAffixElement = container.querySelector(".input-prefix-suffix")
        const prefixElement = container.querySelector(".vshark-input-prefix")
        const suffixElement = container.querySelector(".vshark-input-suffix")
        const prependElement = container.querySelector(".vshark-input-group-prepend")
        const appendElement = container.querySelector(".vshark-input-group-append")
        
        // Assert
        expect(inputEndElement).toBeInTheDocument()
        expect(inputAffixElement).toBeInTheDocument()
        expect(prefixElement).toBeInTheDocument()
        expect(suffixElement).toBeInTheDocument()
        expect(prependElement).toBeInTheDocument()
        expect(appendElement).toBeInTheDocument()
        expect(inputEndElement).toHaveClass("input-group input-group-prepend input-group-append")
        expect(inputAffixElement).toHaveClass("input-affix-wrapper")

    })

    it("pass the allowClear props can clear all input", () => {
        // Arrange
        const { getByTestId, container } = render(<Input data-testid="input-with-clear-icon" {...testClearProps} placeholder="input with clear icon"  />)
        const inputElement = getByTestId("input-with-clear-icon") as HTMLInputElement
        const clearIcon = container.querySelector(".vshark-input-clear-icon") as HTMLElement
        
        // Assert
        expect(inputElement).toBeInTheDocument()
        expect(clearIcon).toBeInTheDocument()

        // Act
        fireEvent.click(clearIcon)

        // Assert
        expect(inputElement.value.length).toBe(0)
        
    })

    it("should render correct component has disabled props", () => {
        // Arrange
        const { getByTestId, container } = render(<Input {...testDisabledProps} />)
        const elementWrapper = getByTestId("input-component")
        const inputElement = container.querySelector("input") as HTMLInputElement
        const clearIcon = container.querySelector(".vshark-input-clear-icon") as HTMLElement

        // Assert
        expect(elementWrapper).toBeInTheDocument()
        expect(inputElement).toBeInTheDocument()
        expect(clearIcon).not.toBeInTheDocument()

        // Act
        fireEvent.change(inputElement, { target: { value: "这就是爱" } })
        expect(testDisabledProps.onChange).not.toHaveBeenCalled()
        expect(inputElement.value).toEqual("白日梦想家")
    })
})