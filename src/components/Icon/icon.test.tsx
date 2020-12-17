import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { Icon, IconProps } from "./icon"

const defaultProps: IconProps = {
    icon: "coffee",
    className: "nice-icon",
    theme: "dark",
    size: "3x",
    onClick: jest.fn()
}

describe("test Icon Component", () => {
    it("should render the correct default props", () => {
        // Arrange
        const { getByTestId } = render(<Icon data-testid="default-icon" {...defaultProps} />)
        const element = getByTestId("default-icon") as HTMLOrSVGImageElement

        
        // Assert
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual("svg")
        expect(element).toHaveClass("svg-inline--fa fa-coffee fa-3x v-shark-icon icon-dark")

        // Act
        fireEvent.click(element)

        // Assert
        expect(defaultProps.onClick).toBeCalled()

    })

    it("should render the correct component to be 90deg", () => {
        // Arrange
        const { getByTestId } = render(<Icon data-testid="rotation-icon" rotation={90} {...defaultProps} />)
        const element = getByTestId("rotation-icon")

        // Assert
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual("svg")
        expect(element).toHaveClass("fa-rotate-90")
    })

    it("should render the correct component to be spin animation", () => {
        // Arrange
        const { getByTestId } = render(<Icon data-testid="spin-icon" spin {...defaultProps} />)
        const element = getByTestId("spin-icon")

        // Assert
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual("svg")
        expect(element).toHaveClass("fa-spin")

    })
})