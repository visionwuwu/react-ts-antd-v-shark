import React from "react"
import { fireEvent, render } from "@testing-library/react"
import { Button, ButtonProps } from "./button"

jest.mock("../Icon/icon", () => {
    return () => {
        return <i className="fa" />
    }
})

const defaultProps: ButtonProps = {
    btnType: "default",
    icon: "search",
    onClick: jest.fn()
}

const differentProps: ButtonProps = {
    size: "lg",
    btnType: "primary",
    onClick: jest.fn()
}

const linkProps: ButtonProps = {
    btnType: "link",
    href: "https://www.baidu.com"
}

describe("test Button component", () => {
    it("should render the correct default props", () => {
        // Arrange
        const { getByText, container } = render(<Button {...defaultProps}>default</Button>)
        const element = getByText("default").parentElement as HTMLButtonElement
        // Assert
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual("BUTTON")
        expect(element.disabled).not.toBeTruthy()
        expect(element).toHaveClass("btn btn-default")
        expect(container.querySelector(".fa")).toBeInTheDocument()

        // Act
        fireEvent.click(element)

        // Assert
        expect(defaultProps.onClick).toHaveBeenCalled()
    })

    it("should render the correct component based on different props", () => {
        // Arrange
        const { getByText } = render(<Button {...differentProps}>different props</Button>)
        const element = getByText("different props").parentElement as HTMLButtonElement

        // Assert
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual("BUTTON")
        expect(element.disabled).not.toBeTruthy()
        expect(element).toHaveClass("btn btn-lg btn-primary")

        // Act
        fireEvent.click(element)

        // Assert
        expect(differentProps.onClick).toHaveBeenCalled()
    })


    it("should render the corrent component is btnType equal link and provider href props", () => {
        // Arrange
        const { getByText } = render(<Button {...linkProps}>link</Button>)
        const element = getByText("link") as HTMLAnchorElement

        // Assert
        expect(element.tagName).toEqual("A")
        expect(element.href).toBeTruthy()
        expect(element).toHaveClass("btn btn-link")
    })

    it("should render the correct component is disabled", () => {
        // Arrange
        const { getByText } = render(<Button disabled {...defaultProps}>disabled</Button>)
        const element = getByText("disabled").parentElement as HTMLButtonElement

        // Assert
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual("BUTTON")
        expect(element.disabled).toBeTruthy()
        
        // Act
        fireEvent.click(element)

        // Assert
        expect(defaultProps.onClick).not.toHaveBeenCalled()
    })

})