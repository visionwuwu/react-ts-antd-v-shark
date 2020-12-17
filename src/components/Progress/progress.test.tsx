import React from "react"
import { render } from "@testing-library/react"
import Progress, { ProgressProps } from "./progress"

const testProps: ProgressProps = {
    percent: 50,
    strokeHeight: 15,
    strokeColor: "red"
}

const testThemeProps: ProgressProps = {
    percent: 50,
    theme: "info",
    strokeLinecap: "square"
}

const testFormatProps: ProgressProps = {
    percent: 50,
    format: (percent: number) => `${percent}❤`
}

describe("test progress component", () => {
    it("progress has default props should work fine", () => {
        const wrapper = render(<Progress {...testProps} />)
        const progressBar = wrapper.getByTestId("progress-bar")
        const progressBarOuter = wrapper.getByTestId("progress-bar-outer")
        const progressBarInner = wrapper.getByTestId("progress-bar-inner")

        expect(progressBar).toBeInTheDocument()
        expect(progressBar).toHaveClass("vshark-progress-bar")
        expect(progressBarOuter.style.height).toEqual("15px")
        expect(progressBarInner.style.width).toEqual("50%")
        expect(progressBarInner).toHaveClass("linecap-round color-primary")
        expect(progressBarInner.style.backgroundColor).toEqual("red")
    })

    it("theme progress should work fine", () => {
        const wrapper = render(<Progress {...testThemeProps} />)
        const progressBar = wrapper.getByTestId("progress-bar")
        const progressBarInner = wrapper.getByTestId("progress-bar-inner")

        expect(progressBar).toBeInTheDocument()
        expect(progressBarInner).toHaveClass("linecap-square color-info")
    })

    it("test format prgress text", () => {
        const wrapper = render(<Progress {...testFormatProps} />)
        const progressBar = wrapper.getByTestId("progress-bar")

        expect(progressBar).toBeInTheDocument()
        expect(wrapper.queryByText("50❤")).toBeInTheDocument()
    })
})