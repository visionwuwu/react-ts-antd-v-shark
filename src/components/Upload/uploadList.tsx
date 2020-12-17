import React, { FC } from "react"
import { UploadFileProps } from "./upload"
import Icon from "../Icon/icon"
import { Progress } from "../Progress/progress"

export interface UploadListProps {
    /** 已上传的文件列表 */
    fileList: UploadFileProps[];
    /** 移除文件列表项的回调函数 */
    onRemove: (_file: UploadFileProps) => void
}

export const UploadList: FC<UploadListProps> = (props) => {
    const {
        fileList,
        onRemove
    } = props

    return <ul className="vshark-upload-list">
        {
            fileList.map(file => {
                return <li className="vshark-upload-list-item" title={file.name} key={file.uid}>
                    <span className={`file-name file-name-${file.status}`}>
                        <Icon icon="file-alt" theme="secondary" />
                        { file.name }
                    </span>
                    <span className="file-status">
                        { (file.status === "uploading" || file.status === "ready") && <Icon icon="spinner" spin theme="secondary" /> }
                        { file.status === "success" && <Icon icon="check-circle" theme="success" /> }
                        { file.status === "error" && <Icon icon="times-circle" theme="danger" /> }
                    </span>
                    <span className="file-actions">
                        <Icon title="删除文件" icon="times" onClick={() => onRemove(file)} />
                    </span>
                    {
                        file.status === "uploading" &&
                        <Progress percent={ file.percent || 0 } />
                    }
                </li>
            })
        }
    </ul>
}

export default UploadList