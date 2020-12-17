import React, { FC, DragEvent, useState } from "react"
import classnames from "classnames"

export interface DraggerProps {
    onUpload: (files:  FileList) => void;
}

/**
 * ### Dragger组件
 */
export const Dragger: FC<DraggerProps> = (props) => {
    const {
        onUpload,
        children
    } = props

    const [isDragOver, setIsDragOver] = useState(false)
    
    const classes = classnames("vshark-upload-drag", {
        "is-active": isDragOver
    })

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const files = e.dataTransfer.files
        onUpload(files)
    }

    return <div
        className={classes}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
    >
        {children}
    </div>
}

export default Dragger