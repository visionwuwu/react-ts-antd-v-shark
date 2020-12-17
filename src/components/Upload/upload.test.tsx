import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, createEvent, RenderResult, waitFor, queryByText, getByText } from "@testing-library/react"
import Upload, { UploadProps } from "./upload"
import { IconProps } from "../Icon/icon"
import axios from "axios"

jest.mock("../Icon/icon", () => {
    return (props: IconProps) => {
        return <span onClick={props.onClick}>{props.icon}</span>
    }
})

jest.mock("axios")

const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
    action: "https://visionwu.top",
    onChange: jest.fn(),
    onSuccess: jest.fn(),
    onRemove: jest.fn(),
    drag: true
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(["xyz"], "test.png", { type: "image/png" })
describe("test upload component", () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector(".vshark-file-input") as HTMLInputElement
        uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
    })
    it("upload process should works fine", async () => {
        const { queryByText } = wrapper
        mockedAxios.post.mockImplementation(() => {
            return Promise.resolve({ "data": "visionwuwu" })
        })

        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()
        fireEvent.change(fileInput, { target: { files: [testFile] } })
        expect(queryByText("spinner")).toBeInTheDocument()
        await waitFor(() => {
            expect(queryByText("test.png")).toBeInTheDocument()
        })
        expect(queryByText("check-circle")).toBeInTheDocument()
        expect(testProps.onSuccess).toHaveBeenCalledWith("visionwuwu", testFile)
        expect(queryByText("spinner")).not.toBeInTheDocument()
        expect(testProps.onChange).toBeCalledWith(testFile)

        // remove the upload file
        expect(queryByText('times')).toBeInTheDocument()
        fireEvent.click(wrapper.getByText("times"))
        expect(queryByText("test.png")).not.toBeInTheDocument()
        expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
            name: "test.png",
            raw: testFile,
            status: "success"
        }))

    })

    it("drag and drop files should work fine", async () => {
        const { queryByText } = wrapper
        mockedAxios.post.mockResolvedValue({'data': 'visionwuwu'})
        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()
        fireEvent.dragOver(uploadArea)
        expect(uploadArea).toHaveClass("is-active")
        fireEvent.dragLeave(uploadArea)
        expect(uploadArea).not.toHaveClass("is-active")

        const mockDropEvent = createEvent.drop(uploadArea)
        Object.defineProperty(mockDropEvent, "dataTransfer", {
            value: {
                files: [testFile]
            }
        })
        // drop file
        fireEvent(uploadArea, mockDropEvent)
        await waitFor(() => {
            expect(queryByText("test.png")).toBeInTheDocument()
        })
        expect(testProps.onSuccess).toHaveBeenCalledWith('visionwuwu', testFile)
    })
})
