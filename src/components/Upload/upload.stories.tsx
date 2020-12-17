import React from "react"
import { Story, Meta } from "@storybook/react"
import Upload, { UploadProps, UploadFileProps } from "./upload"
import Icon from "../Icon/icon"
import Button from "../Button/button"

export default {
    title: "数据录入/Upload",
    component: Upload
} as Meta


const checkFileSize = (file: File) => {
    const isLimit = file.size / 1024 / 1024 < 0.5
    if (!isLimit) {
        alert("文件大小不能超过0.5M！")
    }
    return isLimit
}

// const filePromise = (file: File) => {
//     const newFile = new File([file], "new_name.docx", { type: file.type })
//     return Promise.resolve(newFile)
// }

const defaultFileList: UploadFileProps[] = [
    { uid: Date.now() + "1", name: "file1.png", size: 1024, status: "success", percent: 100 },
    { uid: Date.now() + "2", name: "file2.jpg", size: 1024, status: "success", percent: 100 },
    { uid: Date.now() + "3", name: "file3.png", size: 1024, status: "error", percent: 100 },
]

export const ClickWidthUpload: Story<UploadProps> = (args) => {
    return <>
        <Upload
            {...args}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        >
            <Button icon="upload" btnType="primary" size="default">Click to Upload</Button>
        </Upload>
    </>
}
ClickWidthUpload.storyName = "点击上传"

export const CheckFileSizeWithUpload: Story<UploadProps> = (args) => {
    return <Upload
        {...args}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={checkFileSize}
    >
        <Button icon="upload" size="default" btnType="primary">不能传大于0.5M!</Button>
    </Upload>
}
CheckFileSizeWithUpload.storyName = "控制文件大小"

export const DefaultListWithUpload: Story<UploadProps> = (args) => {
    return <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        defaultFileList={defaultFileList}
    >
        <Button icon="upload" size="default" btnType="primary">Upload</Button>
    </Upload>
}
DefaultListWithUpload.storyName = "已上传的文件列表"

export const DragWithUpload: Story<UploadProps> = (args) => {
    return <>
        <h4 style={{ marginBottom: "20px" }}>组件演示</h4>
        <Upload
            {...args}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            drag
        >
            <Icon icon="upload" size="3x" theme="secondary" />
            <br />
            <br />
            <p>点击或者拖动到此区域进行上传</p>
        </Upload>
    </>
}
DragWithUpload.storyName = "拖拽上传"