import React, { ChangeEvent, FC, InputHTMLAttributes, ReactElement, useState, useRef, useEffect } from "react"
import classnames from "classnames"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { Icon } from "../Icon/icon"

declare type InputSizeProps = "lg" | "default" | "sm"

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, keyof { size: "size", prefix: "prefix" }> {
    /**
     * 输入框内容
     */
    value?: string;
    /**
     * 输入框默认内容
     */
    defaultValue?: string;
    /**
     * 不同尺寸
     */
    size?: InputSizeProps;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 输入框前缀
     */
    prepend?: string | ReactElement;
    /**
     * 输入框后缀
     */
    append?: string | ReactElement;
    /**
     * 带有前缀图标的 input
     */
    prefix?: IconProp;
    /**
     * 带有后缀图标的 input
     */
    suffix?: IconProp;
    /**
     * 点击删除图标清空内容
     */
    allowClear?: boolean;
    /**
     * 在点击由allowClear属性生成的清空内容图标时触发
     */
    onClear?: () => void;
    /**
     * 输入框onChange事件的回调
     */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}


/**
 * ### 基础输入框
 * ~~~ts
 *  import { Input } from "v-shark"
 * ~~~
 */
export const Input: FC<InputProps> = (props) => {
    const {
        size,
        disabled,
        prepend,
        append,
        prefix,
        suffix,
        allowClear,
        className,
        style,
        value,
        defaultValue,
        onClear,
        onChange,
        ...restProps
    } = props

    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }
    
    const initInputValue: string = fixControlledValue(value) || (defaultValue ? defaultValue : "")

    const [isFocus, setIsFocus] = useState(false)
    const [inputValue, setInputValue] = useState<string>(initInputValue)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (initInputValue) {
            setInputValue(initInputValue)
        } else {
            setInputValue("")
        }
    }, [initInputValue])

    const classesWrapper = classnames("vshark-input-wrapper", className, {
        [`input-size-${size}`]: size !== undefined,
        "is-disabled": disabled,
        "input-group": prepend || append,
        "input-group-prepend": !!prepend,
        "input-group-append": !!append,
        "input-affix-wrapper": !!prefix || !!suffix
    })

    const classesAffixWrap = classnames("vshark-input-affix-wrapper", {
        "vshark-input-affix-wrapper-focused": isFocus
    })

    const eventsCallbacks = {
        onFocus: () => setIsFocus(true),
        onBlur: () => setIsFocus(false),
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
            if (onChange && !disabled) {
                setInputValue(e.target.value)
                onChange(e)
            }
        }
    }
    const handleClearInput = () => {
        if (inputRef.current) {
            inputRef.current.value = ""
            setInputValue("")
        }
        onClear && onClear()
    }

    const isShowInputSuffix = (!!suffix || allowClear)
    const isShowClearIcon = allowClear && (inputValue.length > 0) && !disabled

    return <div data-testid="input-component"className={classesWrapper} style={style}>
        {prepend && <div className="vshark-input-group-prepend">{prepend}</div>}
        <div className={classesAffixWrap}>
            {prefix && <div className="vshark-input-prefix"><Icon icon={prefix}></Icon></div>}
            <input
                ref={inputRef}
                className="vshark-input-inner"
                disabled={disabled}
                value={inputValue}
                {...eventsCallbacks}
                {...restProps}
            />
            {isShowInputSuffix && <div className="vshark-input-suffix">
                {isShowClearIcon && <Icon onClick={handleClearInput} className="vshark-input-clear-icon" icon="times-circle"></Icon>}
                {suffix && <Icon icon={suffix}></Icon>}
            </div>}
        </div>
        {append && <div className="vshark-input-group-append">{append}</div>}
    </div>
}

Input.defaultProps = {
    size: "default",
    disabled: false,
    allowClear: false
}

export default Input