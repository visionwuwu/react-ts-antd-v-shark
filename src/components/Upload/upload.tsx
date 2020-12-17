import React, { ChangeEvent, FC, useRef, useState } from "react"
import classnames from "classnames"
import axios from "axios"
import { UploadList } from "./uploadList"
import { Dragger } from "./dragger"

export declare type UploadFileStatus = "ready" | "uploading" | "success" | "error"

export interface UploadFileProps {
    uid: string;
    name: string;
    size: number;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploadProps {
    /** 上传的服务器地址 */
    action: string;
    /** 上传之前的钩子函数 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 上传进度的钩子函数 */
    onProgress?: (percent: number, file: File) => void;
    /** 上传成功的钩子函数 */
    onSuccess?: (data: any, file: File) => void;
    /** 上传失败的钩子函数 */
    onError?: (error: any, file: File) => void;
    /** 上传文件改变的钩子函数 */
    onChange?: (file: File) => void;
    /** 点击移除上传的文件回调函数 */
    onRemove?: (file: UploadFileProps) => void
    /** 默认已上传的文件列表 */
    defaultFileList?: UploadFileProps[];
    /** 是否拖拽上传 */
    drag?: boolean;
    /** 自定义上传请求头 */
    headers?: { [key: string]: any };
    /** 接受上传的文件类型 */
    accept?: string;
    /** 发到后台的文件参数名 */
    name?: string;
    /** 上传需要的额外参数 */
    data?: {[key: string]: any };
    /** 上传请求时是否携带cookie */
    withCredentials?: boolean;
    /** 是否支持多选文件，ie10+。开启后可按住ctrl可多选文件 */
    multiple?: boolean;
    /** 自定义classNames */
    classNames?: string;
}

/**
 * ### 文件上传
 * ~~~ts
 *  import { Upload } from "v-shark"
 * ~~~
 */
export const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        name,
        defaultFileList,
        multiple,
        accept,
        headers,
        withCredentials,
        data,
        classNames,
        children,
        drag,
        onProgress,
        onSuccess,
        onError,
        onChange,
        beforeUpload,
        onRemove
    } = props

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFileProps[]>(defaultFileList || [])

    const updateFileList = (file: UploadFileProps, options: Partial<UploadFileProps>) => {
        setFileList(prevFileList => {
            return prevFileList.map(item => {
                if (file.uid === item.uid) {
                    return {
                        ...item,
                        ...options
                    }
                }else {
                    return item
                }
            })
        })
    }

    const post = (file: File) => {
        const _file: UploadFileProps = {
            uid: `upload-${Date.now()}`,
            name: file.name,
            size: file.size,
            status: "ready",
            percent: 0,
            raw: file,
            response: null,
            error: null
        }
        setFileList(prevFileList => [_file, ...prevFileList])
        const formData = new FormData()
        formData.append(name || file.name, file)
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                "Content-Type": "multipart/form-data"
            },
            withCredentials,
            onUploadProgress(e) {
                const percent = Math.round((e.loaded * 100) / e.total)
                if (percent < 100) {
                    if (onProgress) {
                        updateFileList(_file, { percent, status: "uploading" })
                        onProgress(percent, file)
                    }
                }
            }
        })
        .then(resp => {
            onSuccess && onSuccess(resp.data, file)
            onChange && onChange(file)
            updateFileList(_file, { response: resp.data, status: "success" })
        }).catch(err => {
            onError && onError(err, file)
            onChange && onChange(file)
            updateFileList(_file, { error: err, status: "error" })
        })
    }

    const uploadFiles = (files: FileList) => {
        const postFiles = Array.from(files)
        postFiles.forEach((file) => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if ( result !== false ) {
                    post(file)
                }
            }
        })
    }

    const handleInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return;

        uploadFiles(files)

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleRemoveFile = (file: UploadFileProps) => {
        setFileList(prevFileList => {
            return prevFileList.filter(item => item.uid !== file.uid )
        })
        onRemove && onRemove(file)
    }


    return <div className={classnames("vshark-upload", classNames)}>
        <div className="vshark-upload-input" onClick={handleInputClick}>
            <input
                ref={fileInputRef}
                className="vshark-file-input"
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleInputChange}
                style={{
                    display: "none"
                }}
            />
            { 
                drag ? <Dragger onUpload={(files) => {
                    uploadFiles(files)
                }}>
                    {children}
                </Dragger> : children
            }
        </div>
         { fileList.length > 0 && <UploadList fileList={fileList} onRemove={handleRemoveFile} /> }
    </div>
}

Upload.defaultProps = {
    name: "file"
}

export default Upload